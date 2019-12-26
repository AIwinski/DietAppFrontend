import styled from "styled-components";

type Props = {
    isActive: boolean;
}

export const ListElementStyled = styled.div<Props>`
    padding: 1rem;
    cursor: pointer;
    background: ${props => (props.isActive ? "#fff" : "#eee")};
    &:hover {
        background: #eee;
    }
`;