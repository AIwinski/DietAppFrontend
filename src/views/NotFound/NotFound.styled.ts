import styled from 'styled-components'
import { NAV_HEADROOM } from '../../styles/variables'

export const NotFoundStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - ${NAV_HEADROOM});
    font-size: 2.6rem;
    width: 100vw;
`