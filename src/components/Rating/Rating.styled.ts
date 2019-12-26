import styled from "styled-components";
import { COLORS } from "../../styles/variables";

export const RatingStyled = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 0.5rem;
`;

export const RatingValue = styled.span`
    font-size: 1.5rem;
    margin-right: 0.5rem;
`;

export type StarProps = {
    active: boolean
}

export const Star = styled.span<StarProps>`
    font-size: 2.4rem;
    color: ${props => (props.active ? COLORS.golden : COLORS.gray)};
    vertical-align: top;
`;

export const RatingNumber = styled.span`
    font-size: 1.5rem;
    margin-left: 0.5rem;
`;
