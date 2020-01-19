import styled from "styled-components";

type Props = {
    isActive: boolean;
}

export const ListElementStyled = styled.div<Props>`
    padding: 1rem;
    cursor: pointer;
    background: ${props => (props.isActive ? "#fff" : "#e5e5e5")};
    border-left: ${props => (props.isActive ? "none" : "3px solid #c92d02")};
    &:hover {
        background: #eee;
    }
`;