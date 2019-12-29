import React, { useRef } from "react";
import { VideoChatStyled, VideoSection, ChatSection, MainVideo, SmallVideo } from "./VideoChat.styled";
import { ApplicationState } from "../../store";
import { RouteComponentProps } from "react-router-dom";
// @ts-ignore
import adapter from "webrtc-adapter";

interface MatchParams {
    id: string;
}

type Props = RouteComponentProps<MatchParams> & ReturnType<typeof mapStateToProps> & {};

const VideoChat = (props: Props) => {
    const mediaStreamConstraints = {
        video: true,
        audio: true
    };
    const config: RTCConfiguration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
    const mainVideoRef = useRef(null);
    const smallVideoRef = useRef(null);

    let localStream: any;
    let pc1: any;
    let pc2: any;
    const offerOptions = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
    };

    const start = async () => {
        console.log("Requesting local stream");
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            console.log("Received local stream");
            // @ts-ignore
            smallVideoRef.current.srcObject = stream;
            localStream = stream;
        } catch (e) {
            alert(`getUserMedia() error: ${e.name}`);
        }
    };

    const call = async () => {
        console.log("Starting call");
        const videoTracks = localStream.getVideoTracks();
        const audioTracks = localStream.getAudioTracks();
        if (videoTracks.length > 0) {
            console.log(`Using video device: ${videoTracks[0].label}`);
        }
        if (audioTracks.length > 0) {
            console.log(`Using audio device: ${audioTracks[0].label}`);
        }
        pc1 = new RTCPeerConnection();
        console.log("Created local peer connection object pc1");
        pc1.addEventListener("icecandidate", (e: any) => onIceCandidate(pc1, e));
        pc2 = new RTCPeerConnection();
        console.log("Created remote peer connection object pc2");
        pc2.addEventListener("icecandidate", (e: any) => onIceCandidate(pc2, e));
        pc1.addEventListener("iceconnectionstatechange", (e: any) => onIceStateChange(pc1, e));
        pc2.addEventListener("iceconnectionstatechange", (e: any) => onIceStateChange(pc2, e));
        pc2.addEventListener("track", gotRemoteStream);

        localStream.getTracks().forEach((track: any) => pc1.addTrack(track, localStream));
        console.log("Added local stream to pc1");

        try {
            console.log("pc1 createOffer start");
            const offer = await pc1.createOffer(offerOptions);
            await onCreateOfferSuccess(offer);
        } catch (e) {
            onCreateSessionDescriptionError(e);
        }
    };

    const getName = (pc: any) => {
        return pc === pc1 ? "pc1" : "pc2";
    };

    const getOtherPc = (pc: any) => {
        return pc === pc1 ? pc2 : pc1;
    };

    function onCreateSessionDescriptionError(error: any) {
        console.log(`Failed to create session description: ${error.toString()}`);
    }

    const onCreateOfferSuccess = async (desc: any) => {
        console.log(`Offer from pc1\n${desc.sdp}`);
        console.log("pc1 setLocalDescription start");
        try {
            await pc1.setLocalDescription(desc);
            onSetLocalSuccess(pc1);
        } catch (e) {
            onSetSessionDescriptionError("");
        }

        console.log("pc2 setRemoteDescription start");
        try {
            await pc2.setRemoteDescription(desc);
            onSetRemoteSuccess(pc2);
        } catch (e) {
            onSetSessionDescriptionError("");
        }

        console.log("pc2 createAnswer start");
        // Since the 'remote' side has no media stream we need
        // to pass in the right constraints in order for it to
        // accept the incoming offer of audio and video.
        try {
            const answer = await pc2.createAnswer();
            await onCreateAnswerSuccess(answer);
        } catch (e) {
            onCreateSessionDescriptionError(e);
        }
    };

    const onSetLocalSuccess = (pc: any) => {
        console.log(`${getName(pc)} setLocalDescription complete`);
    };

    const onSetRemoteSuccess = (pc: any) => {
        console.log(`${getName(pc)} setRemoteDescription complete`);
    };

    const onSetSessionDescriptionError = (error: any) => {
        console.log(`Failed to set session description: ${error.toString()}`);
    };

    const gotRemoteStream = (e: any) => {
        //@ts-ignore
        if (mainVideoRef.current.srcObject !== e.streams[0]) {
            //@ts-ignore
            mainVideoRef.current.srcObject = e.streams[0];
            console.log("pc2 received remote stream");
        }
    };

    const onCreateAnswerSuccess = async (desc: any) => {
        console.log(`Answer from pc2:\n${desc.sdp}`);
        console.log("pc2 setLocalDescription start");
        try {
            await pc2.setLocalDescription(desc);
            onSetLocalSuccess(pc2);
        } catch (e) {
            onSetSessionDescriptionError(e);
        }
        console.log("pc1 setRemoteDescription start");
        try {
            await pc1.setRemoteDescription(desc);
            onSetRemoteSuccess(pc1);
        } catch (e) {
            onSetSessionDescriptionError(e);
        }
    };

    const onIceCandidate = async (pc: any, event: any) => {
        try {
            await getOtherPc(pc).addIceCandidate(event.candidate);
            onAddIceCandidateSuccess(pc);
        } catch (e) {
            onAddIceCandidateError(pc, e);
        }
        console.log(`${getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : "(null)"}`);
    };

    const onAddIceCandidateSuccess = (pc: any) => {
        console.log(`${getName(pc)} addIceCandidate success`);
    };

    const onAddIceCandidateError = (pc: any, error: any) => {
        console.log(`${getName(pc)} failed to add ICE Candidate: ${error.toString()}`);
    };

    const onIceStateChange = (pc: any, event: any) => {
        if (pc) {
            console.log(`${getName(pc)} ICE state: ${pc.iceConnectionState}`);
            console.log("ICE state change event: ", event);
        }
    };

    const hangup = () => {
        console.log("Ending call");
        pc1.close();
        pc2.close();
        pc1 = null;
        pc2 = null;
    };

    return (
        <VideoChatStyled>
            <VideoSection>
                <MainVideo ref={mainVideoRef} autoPlay playsinline></MainVideo>
                <SmallVideo ref={smallVideoRef} autoPlay playsinline></SmallVideo>
            </VideoSection>
            <ChatSection>
                <button onClick={start}>Start</button>
                <button onClick={call}>Call</button>
                <button onClick={hangup}>Hang Up</button>
            </ChatSection>
        </VideoChatStyled>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return { currentUser: state.auth.currentUser };
};

export default VideoChat;
