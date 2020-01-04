import styled from "styled-components";
import { COLORS } from "../../../styles/variables";

type Props = {
    isReceived: boolean;
}

export const MessageStyled = styled.div<Props>`
    border: 1px solid #ddd;
    display: flex;
    align-self: flex-start;
    padding: 0;
    border-radius: 40px;
    font-size: 1.6rem;
    line-height: 2rem;
    vertical-align: baseline;
    padding: 0.2rem 1.2rem;
    margin: 0.2rem 0;
    margin-right: 20%;
    border-top-left-radius: 6px;
    background: #ccc;
    ${props =>
        props.isReceived &&
        `
        align-self: flex-end;
        color: white;
        background: ${COLORS.blue};
        margin-right: 0;
        margin-left: 20%;
        border-top-left-radius: 40px;
        border-bottom-right-radius: 6px;
    `}
`;

export const MessageWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const FileBadge = styled.div`
    cursor: pointer;
    font-weight: bold;
`