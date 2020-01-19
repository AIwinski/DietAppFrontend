import styled from "styled-components";
import { NAV_HEADROOM, BREAKPOINTS } from "../../styles/variables";

export const ChatFormWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 20%;
    form {
        height: 100%;
    }

    @media (max-width: ${BREAKPOINTS.md}) {
        height: auto;
    }
`;

export const ChatStyled = styled.div`
    position: relative;
    height: calc(100vh - ${NAV_HEADROOM});
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    box-sizing: border-box;

    @media (max-width: ${BREAKPOINTS.md}) {
        height: auto;
        display: flex;
        flex-direction: column;
    }
`;

export const ConversationWrapper = styled.div`
    position: relative;
    height: calc(100vh - ${NAV_HEADROOM});
    box-sizing: border-box;

    @media (max-width: ${BREAKPOINTS.md}) {
        height: auto;
    }
`;

export const ChatWindow = styled.div`
    box-sizing: border-box;
    height: 80%;
    overflow: auto;
    padding: 0.5rem;
    position: relative;

    @media (max-width: ${BREAKPOINTS.md}) {
        height: auto;
    }
`;

export const ChatInfoWrapper = styled.div`
    position: relative;
`

export const NewMessageBadge = styled.div`

`

export const NoMessagesBadge = styled.div`

`