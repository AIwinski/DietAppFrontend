import styled from 'styled-components';
import { NAV_HEIGHT, COLORS, BREAKPOINTS } from '../../styles/variables';

export const ProfileListStyled = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;

    @media (max-width: ${BREAKPOINTS.md}) {
        display: flex;
        flex-direction: column;
    }
`

export const ListData = styled.div`
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
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

export const LoadMoreButton = styled.button`
    border: 1px solid ${COLORS.blue2};
    background: ${COLORS.blue};
    color: white;
    padding: 1rem 2rem;
    border-radius: 6px;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
`

export const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
`
export const AllFetchedBadge = styled.div`
    border-bottom: 1px solid ${COLORS.blue};
    color: ${COLORS.blue};
    padding: 1rem 2rem;
    font-size: 1.5rem;
    font-weight: bold;
`