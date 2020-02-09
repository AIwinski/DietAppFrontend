import styled from 'styled-components'
import { NAV_HEADROOM } from '../../styles/variables'

export const OfflineStyled = styled.div`
    width: 100vw;
    min-height: calc(100vh - ${NAV_HEADROOM});
    display: flex;
    align-items: center;
    justify-content: center;
`

export const OfflineStyledInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2rem;

    p {
        padding: 1rem 0;
    }
`