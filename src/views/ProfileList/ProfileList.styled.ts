import styled from 'styled-components';
import { NAV_HEIGHT } from '../../styles/variables';

export const ProfileListStyled = styled.div`
    position: relative;
    padding-top: ${NAV_HEIGHT};
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
`

export const ListData = styled.div`
    border: 1px solid green;
    box-sizing: border-box;
    height: 100%;
`

export const ListFilters = styled.div`
    padding: 1rem 2rem;
    box-sizing: border-box;
    height: 100%;
`

export const ListSorting = styled.div`
    padding: 1rem 2rem;
    box-sizing: border-box;
    height: 100%;
`
