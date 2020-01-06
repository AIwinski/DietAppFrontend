import React, { useRef, useEffect, useState } from "react";
import { VideoChatStyled, VideoSection, ChatSection, MainVideo, SmallVideo } from "./VideoChat.styled";
import { ApplicationState } from "../../store";
import { RouteComponentProps } from "react-router-dom";
import { socket } from "../../api";
interface MatchParams {
    id: string;
}

type Props = RouteComponentProps<MatchParams> & ReturnType<typeof mapStateToProps> & {};

let localStream: any;
let peerConnection: any;

const mediaStreamConstraints = {
    video: true,
    audio: true
};
const config: RTCConfiguration = {
    iceServers: [{ urls: "stun:stun.stunprotocol.org:3478" }, { urls: "stun:stun.l.google.com:19302" }]
};

const VideoChat = (props: Props) => {
    const [localAudioActive, setLocalAudioActive] = useState(true);
    const [localVideoActive, setLocalVideoActive] = useState(true);

    const [remoteAudioActive, setRemoteAudioActive] = useState(true);
    const [remoteVideoActive, setRemoteVideoActive] = useState(true);
    const [isRemoteInRoom, setRemoteInRoom] = useState(false);

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    // @ts-ignore

    useEffect(() => {
        socket.emit("WEBRTC_JOIN", { id: props.match.params.id });
        socket.on("WEBRTC", (data: any) => {
            gotMessageFromServer(data);
        });

        socket.on("WEBRTC_STATUS_CHANGED", (data: any) => {
            setRemoteAudioActive(data.audio);
            setRemoteVideoActive(data.video);
        });

        socket.on("WEBRTC_JOINED", () => {
            setRemoteInRoom(true);
        });

        socket.on("WEBRTC_LEFT", () => {
            setRemoteInRoom(false);
        });

        let getWebCam =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia(mediaStreamConstraints)
                .then(getUserMediaSuccess)
                .catch(errorHandler);
            // @ts-ignore
        } else if (getWebCam) {
            // @ts-ignore
            getWebCam(mediaStreamConstraints, getUserMediaSuccess, errorHandler);
        } else {
            alert("Your browser does not support getUserMedia API");
        }
    }, []);

    useEffect(() => {
        return () => {
            socket.emit("WEBRTC_LEAVE", { id: props.match.params.id });
            hangUp();
        };
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
                    if (data.sdp.type === "offer") {
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
        setLocalAudioActive(!localAudioActive);
        let tracks = localStream.getAudioTracks();
        for (var i = 0; i < tracks.length; ++i) {
            tracks[i].enabled = !tracks[i].enabled;
        }
        socket.emit("WEBRTC_CHANGE_STATUS", { audio: localAudioActive, video: localVideoActive, id: props.match.params.id });
    };

    const toggleVideo = () => {
        setLocalVideoActive(!localVideoActive);

        let tracks = localStream.getVideoTracks();
        for (var i = 0; i < tracks.length; ++i) {
            tracks[i].enabled = !tracks[i].enabled;
        }
        socket.emit("WEBRTC_CHANGE_STATUS", { audio: localAudioActive, video: localVideoActive, id: props.match.params.id });
    };

    const hangUp = () => {
        if (localStream) {
            if (typeof localStream.getTracks === "undefined") {
                // Support legacy browsers, like phantomJs we use to run tests.
                localStream.stop();
            } else {
                localStream.getTracks().forEach((track: any) => {
                    track.stop();
                });
            }
            localStream = null;
        }

        if (peerConnection) {
            peerConnection.close();
            peerConnection = null;
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
                <button onClick={() => toggleAudio()}>toggle audio</button>
                <button onClick={() => toggleVideo()}>toggle video</button>
                <div>local audio: {String(localAudioActive)}</div>
                <div>local video: {String(localVideoActive)}</div>
                <div>remote audio: {String(remoteAudioActive)}</div>
                <div>remote video: {String(remoteVideoActive)}</div>
                <div>is remote in room: {String(isRemoteInRoom)}</div>
            </ChatSection>
        </VideoChatStyled>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return { currentUser: state.auth.currentUser };
};

export default VideoChat;
