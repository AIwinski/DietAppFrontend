import React from "react";
import {
    VideoChatStyled,
    VideoSection,
    ChatSection,
    MainVideoWrapper,
    SmallVideoWrapper,
    BottomSection,
    UpperSection,
    MainVideo,
    SmallVideo
} from "./VideoChat.styled";
import { ApplicationState } from "../../store";
import { RouteComponentProps } from "react-router-dom";

interface MatchParams {
    id: string;
}

type Props = RouteComponentProps<MatchParams> & ReturnType<typeof mapStateToProps> & {};

const VideoChat = (props: Props) => {
    return (
        <VideoChatStyled>
            <UpperSection>
                <MainVideoWrapper>
                    {/* <MainVideo></MainVideo> */}
                </MainVideoWrapper>
                <SmallVideoWrapper>
                    {/* <SmallVideo></SmallVideo> */}
                </SmallVideoWrapper>
            </UpperSection>
            <BottomSection></BottomSection>
            <UpperSection></UpperSection>
            <BottomSection></BottomSection>
        </VideoChatStyled>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return { currentUser: state.auth.currentUser };
};

export default VideoChat;
