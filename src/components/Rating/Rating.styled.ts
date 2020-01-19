import styled from "styled-components";
import { COLORS, BREAKPOINTS } from "../../styles/variables";

export const RatingStyled = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 0.5rem;
`;

export const RatingValue = styled.span`
    font-size: 1.2rem;
    margin-right: 0.2rem;
    width: 5rem;
`;

export type StarProps = {
    active: boolean
}

export const Star = styled.span<StarProps>`
    font-size: 2.4rem;
    @media (max-width: ${BREAKPOINTS.md}) {
        font-size: 1.6rem;
    }
    color: ${props => (props.active ? COLORS.golden : COLORS.gray)};
    vertical-align: top;
`;

export const RatingNumber = styled.span`
    font-size: 1.2rem;
    margin-left: 0.2rem;
`;
