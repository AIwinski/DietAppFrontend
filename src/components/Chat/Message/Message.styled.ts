import styled from "styled-components";

type Props = {
    isReceived: boolean;
}

export const MessageStyled = styled.div<Props>`
    border: 1px solid green;
    display: flex;
    align-self: flex-start;
    padding: 0;
    border-radius: 40px;
    font-size: 1.6rem;
    line-height: 2rem;
    vertical-align: baseline;
    padding: 0 1rem;
    margin: 0.2rem 0;
    margin-right: 20%;
    border-top-left-radius: 6px;
    ${props =>
        props.isReceived &&
        `
        align-self: flex-end;
        color: red;
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