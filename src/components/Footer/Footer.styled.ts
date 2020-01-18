import styled, { keyframes } from 'styled-components';
import { COLORS } from '../../styles/variables';

const show = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 0.7;
    }
`

export const FooterStyled = styled.footer`
    background: ${COLORS.white};
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ddd;
    margin-top: 2rem;
    box-shadow:
    0 -4.5px 41.3px 8px rgba(0, 0, 0, 0.034),
    0 -7.2px 48.5px 8px rgba(0, 0, 0, 0.043),
    0 -6.6px 52.6px 8px rgba(0, 0, 0, 0.053),
    0 14px 80px 8px rgba(0, 0, 0, 0.07)
    ;
    opacity: 0;


    animation-name: ${show };
    animation-delay: 1s;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

`

export const FooterStyledInner = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
`