import styled from 'styled-components'
import { BREAKPOINTS } from '../../styles/variables'

export const ProfileSettingsStyled = styled.div`
    
`

export const ProfileSettingsStyledInner = styled.div`
    display: grid;
    grid-template-columns: 2fr 5fr;
    grid-gap: 1rem;
    padding: 2rem;

    @media (max-width: ${BREAKPOINTS.md}) {
        grid-template-columns: 1fr;
        padding: 0.5rem;
    }

`

export const SettingList = styled.div`

`

export const SettingListTitle = styled.div`
    padding: 0.8rem;
    background: #ddd;
`

type SettingListElementProps = {
    isActive?: boolean;
}

export const SettingListElement = styled.div<SettingListElementProps>`
    cursor: pointer;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-top: none;

    ${({ isActive }) =>
        isActive &&
        `
            font-weight: bold;
            border-left: 2px solid #FC020F;
        `}

`

export const SettingWrapper = styled.div`

`