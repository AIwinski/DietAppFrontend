import styled from 'styled-components';
import { COLORS, BREAKPOINTS } from '../../styles/variables';

type CardStyledProps = {
    isPremium: boolean
}

export const CardStyled = styled.div<CardStyledProps>`
    padding: 1rem;
    margin: 0.5rem;
    /* border: 1px solid ${props => props.isPremium ? COLORS.golden : COLORS.lightgray}; */
    border: 1px solid #ddd;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    background: white;

    -webkit-box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.15);

    height: 18rem;

    @media (max-width: ${BREAKPOINTS.md}) {
        height: 22rem;
    }

    :hover {
        background: #f6f6f6;
    }
`

export const CardImageWrapper = styled.div`
    width: 16rem;
    height: 16rem;

    @media (max-width: ${BREAKPOINTS.md}) {
        width: 10rem;
        height: 10rem;
    }
`

export const CardContent = styled.div`
    display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;

        @media (max-width: ${BREAKPOINTS.md}) {
            flex-direction: column;
        }
`

export const CardContentLeft = styled.div`
    padding: 0 1rem;
`

export const CardContentRight = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;

        @media (max-width: ${BREAKPOINTS.md}) {
            flex-direction: row;
            align-items: flex-start;
        }
`

export const CardName = styled.span`
font-weight: bold;
        font-size: 2rem;
`

export const CardCity = styled.span`
color: gray;
        display: block;
`

export const CardDescription = styled.div`
    overflow: hidden;
    position: relative;
    line-height: 1.2em;
    max-height: 6em;
    text-align: justify;    
    margin-right: -1em;
    padding-right: 1em;

    &:before {
        content: '...';
        position: absolute;
        right: 0;
        bottom: 0;
        right: 1rem;
        background-color: white;
    }
    &:after {
        content: '';
        position: absolute;
        right: 0;
        width: 1em;
        height: 1em;
        margin-top: 0.2em;
        background: white;
    }
`

export const PremiumTag = styled.div`
    color: ${COLORS.golden};
`