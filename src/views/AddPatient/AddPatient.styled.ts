import styled from 'styled-components';
import { NAV_HEADROOM } from '../../styles/variables';

export const AddPatientStyled = styled.div`
    width: 100vw;
    min-height: calc(100vh - ${NAV_HEADROOM});
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: calc(1 * ${NAV_HEADROOM});
`

export const AddPatientStyledInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`