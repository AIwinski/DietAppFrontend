import React, { useRef, useEffect, useState } from "react";
import {
    VideoChatStyled,
    VideoSection,
    ChatSection,
    MainVideo,
    SmallVideo,
    VideoInfo,
    Cont,
    Buttons,
    Toggle
} from "./VideoChat.styled";
import { InfoStyled, InfoWrapper, Name, NoInfo, Email, AccountType, Container } from "../../components/Chat/Info/Info.styled";
import { ApplicationState } from "../../store";
import { RouteComponentProps } from "react-router-dom";
import { socket, Profile } from "../../api";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Avatar from "../../components/Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBars, faTimes, faMicrophoneSlash, faMicrophone, faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";

interface MatchParams {
    id: string;
}

type Props = RouteComponentProps<MatchParams> & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

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

    const [remoteAudioActive, setRemoteAudioActive] = useState(false);
    const [remoteVideoActive, setRemoteVideoActive] = useState(false);
    const [isRemoteInRoom, setRemoteInRoom] = useState(false);
    const [user, setUser] = useState();

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    // @ts-ignore

    useEffect(() => {
        Profile.getUser(props.match.params.id)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    setUser(res.data);
                } else {
                    setTimeout(() => {
                        props.push("/");
                    }, 500);
                }
            })
            .catch(err => {
                setTimeout(() => {
                    props.push("/");
                }, 500);
            });

        socket.emit("WEBRTC_JOIN", { id: props.match.params.id, audio: localAudioActive, video: localVideoActive });
        socket.on("WEBRTC", (data: any) => {
            gotMessageFromServer(data);
        });

        socket.on("WEBRTC_STATUS_CHANGED", (data: any) => {
            if (data.id !== props.currentUser.id) {
                setRemoteAudioActive(data.audio);
                setRemoteVideoActive(data.video);
            }
        });

        socket.on("WEBRTC_JOINED", (data: any) => {
            setRemoteInRoom(true);
            if (!peerConnection) {
                start(true);
            }
            if (data.id !== props.currentUser.id) {
                setRemoteAudioActive(data.audio);
                setRemoteVideoActive(data.video);
            }
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
        if(!localStream) {
            return;
        }
        setLocalAudioActive(!localAudioActive);
        let tracks = localStream.getAudioTracks();
        for (var i = 0; i < tracks.length; ++i) {
            tracks[i].enabled = !tracks[i].enabled;
        }
        socket.emit("WEBRTC_CHANGE_STATUS", { audio: localAudioActive, video: localVideoActive, id: props.match.params.id });
    };

    const toggleVideo = () => {
        if(!localStream) {
            return;
        }
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
                {peerConnection ? (
                    <MainVideo ref={remoteVideoRef} autoPlay playsinline></MainVideo>
                ) : (
                    user && (
                        <Cont>
                            <VideoInfo>Oczekiwanie na {user.displayName}...</VideoInfo>
                            <Loader></Loader>
                        </Cont>
                    )
                )}

                <SmallVideo ref={localVideoRef} autoPlay playsinline></SmallVideo>
            </VideoSection>
            <ChatSection>
                {user ? (
                    <React.Fragment>
                        Chat wideo z:
                        <Container>
                            <Avatar url={user.avatar}></Avatar>
                            <Name>{user.displayName}</Name>
                        </Container>
                        <Email>Email: {user.email}</Email>
                        <AccountType>Typ konta: {user.accountType === "doctor" ? "lekarz" : "pacjent"}</AccountType>
                    </React.Fragment>
                ) : (
                    <Loader></Loader>
                )}

                <Buttons>
                    <Toggle onClick={() => toggleAudio()}>
                        {localAudioActive ? (
                            <FontAwesomeIcon icon={faMicrophone}></FontAwesomeIcon>
                        ) : (
                            <FontAwesomeIcon icon={faMicrophoneSlash}></FontAwesomeIcon>
                        )}
                    </Toggle>
                    <Toggle onClick={() => toggleVideo()}>
                        {localVideoActive ? (
                            <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
                        ) : (
                            <FontAwesomeIcon icon={faVideoSlash}></FontAwesomeIcon>
                        )}
                    </Toggle>
                </Buttons>
                {/* <button onClick={() => start(true)}>start</button> */}

                {/* <div>local audio: {String(localAudioActive)}</div>
                <div>local video: {String(localVideoActive)}</div> */}
                {/* <div>remote audio: {String(remoteAudioActive)}</div>
                <div>remote video: {String(remoteVideoActive)}</div>
                <div>is remote in room: {String(isRemoteInRoom)}</div>
                <FormGroup>
                    <LabelStyled>remote audio</LabelStyled>
                    <input type="checkbox" checked={remoteAudioActive} disabled/>
                </FormGroup>
                <FormGroup>
                    <LabelStyled>remote vido</LabelStyled>
                    <input type="checkbox" checked={remoteVideoActive} disabled/>
                </FormGroup> */}
            </ChatSection>
        </VideoChatStyled>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return { currentUser: state.auth.currentUser };
};

const mapDispatchToProps = {
    push
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);
