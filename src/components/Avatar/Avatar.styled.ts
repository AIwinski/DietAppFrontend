import styled from 'styled-components';

const AVATAR_SIZE = "30px";

interface Props {
    isFull?: boolean,
}

export const AvatarWrapper = styled.div<Props>`
    width: ${props => (props.isFull ? "100%": AVATAR_SIZE)};
    height: ${props => (props.isFull ? "100%": AVATAR_SIZE)};
    border-radius: ${props => (props.isFull ? "0px": AVATAR_SIZE)};
    border: 1px solid #ccc;
`

export const AvatarImage = styled.img<Props>`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-size: contain;
    border-radius: ${props => (props.isFull ? "0px": AVATAR_SIZE)};
`