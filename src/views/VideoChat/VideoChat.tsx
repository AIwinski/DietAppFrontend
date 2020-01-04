import React, { useRef, useEffect, useState } from "react";
import { VideoChatStyled, VideoSection, ChatSection, MainVideo, SmallVideo } from "./VideoChat.styled";
import { ApplicationState } from "../../store";
import { RouteComponentProps } from "react-router-dom";
import { socket } from "../../api";
interface MatchParams {
    id: string;
}

type Props = RouteComponentProps<MatchParams> & ReturnType<typeof mapStateToProps> & {};

const VideoChat = (props: Props) => {
    const [audioActive, setAudioActive] = useState(true);
    const [videoActive, setVideoActive] = useState(true);

    const mediaStreamConstraints = {
        video: true,
        audio: true
    };
    const config: RTCConfiguration = {
        iceServers: [{ urls: "stun:stun.stunprotocol.org:3478" }, { urls: "stun:stun.l.google.com:19302" }]
    };
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    let localStream: any;
    let peerConnection: any;
    // @ts-ignore
    navigator.getWebCam =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    useEffect(() => {
        socket.on("WEBRTC", (data: any) => {
            console.log("WEBRTC");
            console.log(data);
            gotMessageFromServer(data);
        });

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia(mediaStreamConstraints)
                .then(getUserMediaSuccess)
                .catch(errorHandler);
            // @ts-ignore
        } else if (navigator.getWebCam) {
            // @ts-ignore
            navigator.getWebCam(mediaStreamConstraints, getUserMediaSuccess, errorHandler);
        } else {
            alert("Your browser does not support getUserMedia API");
        }
    }, []);

    const getUserMediaSuccess = (stream: any) => {
        localStream = stream;
        // @ts-ignore
        localVideoRef.current.srcObject = stream;
    };

    const start = (isCaller: boolean) => {
        peerConnection = new RTCPeerConnection(config);
        peerConnection.onicecandidate = gotIceCandidate;
        peerConnection.ontrack = gotRemoteStream;
        peerConnection.addStream(localStream);

        if (isCaller) {
            peerConnection
                .createOffer()
                .then(createdDescription)
                .catch(errorHandler);
        }
    };

    const gotMessageFromServer = (data: any) => {
        if (!peerConnection) start(false);

        if (data.sdp) {
            peerConnection
                .setRemoteDescription(new RTCSessionDescription(data.sdp))
                .then(function() {
                    // Only create answers in response to offers
                    if (data.sdp.type == "offer") {
                        peerConnection
                            .createAnswer()
                            .then(createdDescription)
                            .catch(errorHandler);
                    }
                })
                .catch(errorHandler);
        } else if (data.ice) {
            peerConnection.addIceCandidate(new RTCIceCandidate(data.ice)).catch(errorHandler);
        }
    };

    const gotIceCandidate = (event: any) => {
        if (event.candidate != null) {
            socket.emit("WEBRTC_SEND", { ice: event.candidate, id: props.match.params.id });
        }
    };

    const createdDescription = (description: any) => {
        console.log("got description");

        peerConnection
            .setLocalDescription(description)
            .then(function() {
                socket.emit("WEBRTC_SEND", { sdp: peerConnection.localDescription, id: props.match.params.id });
            })
            .catch(errorHandler);
    };

    const gotRemoteStream = (event: any) => {
        console.log("got remote stream");
        // @ts-ignore
        remoteVideoRef.current.srcObject = event.streams[0];
    };

    const errorHandler = (error: any) => {
        console.log(error);
    };

    const toggleAudio = () => {
        setAudioActive(!audioActive);
        let audioTracks = localStream.getAudioTracks();
        for (var i = 0; i < audioTracks.length; ++i) {
            audioTracks[i].enabled = !audioTracks[i].enabled;
        }
    };

    const toggleVideo = () => {
        setVideoActive(!videoActive);
        let audioTracks = localStream.getVideoTracks();
        for (var i = 0; i < audioTracks.length; ++i) {
            audioTracks[i].enabled = !audioTracks[i].enabled;
        }
    };

    return (
        <VideoChatStyled>
            <VideoSection>
                <MainVideo ref={remoteVideoRef} autoPlay playsinline></MainVideo>
                <SmallVideo ref={localVideoRef} autoPlay playsinline></SmallVideo>
            </VideoSection>
            <ChatSection>
                {props.match.params.id}
                <button onClick={() => start(true)}>start</button>
            </ChatSection>
        </VideoChatStyled>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return { currentUser: state.auth.currentUser };
};

export default VideoChat;
