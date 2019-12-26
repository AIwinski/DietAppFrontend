import styled from "styled-components"
import { NAV_HEADROOM, COLORS } from "../../styles/variables"


export const LoginPageStyled = styled.div`
    width: 100vw;
    min-height: calc(100vh - ${NAV_HEADROOM});
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: calc(1 * ${NAV_HEADROOM});
`

export const LoginPageStyledInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const OrBadge = styled.span`
    display: block;
    width: 100%;
    padding: 0.5rem;
    text-align: center;
`
