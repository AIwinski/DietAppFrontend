import styled from "styled-components";
import { NAV_HEADROOM } from "../../styles/variables";

export const ChatFormWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 20%;
    form {
        height: 100%;
    }
`;

export const ChatStyled = styled.div`
    position: relative;
    height: calc(100vh - ${NAV_HEADROOM});
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    box-sizing: border-box;
`;

export const ConversationWrapper = styled.div`
    position: relative;
    height: calc(100vh - ${NAV_HEADROOM});
    box-sizing: border-box;
`;

export const ChatWindow = styled.div`
    box-sizing: border-box;
    height: 80%;
    overflow: auto;
    padding: 0.5rem;
    position: relative;
`;

export const ChatInfoWrapper = styled.div`
    position: relative;
`