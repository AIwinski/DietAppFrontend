import styled from 'styled-components';
import { COLORS } from '../../styles/variables';

type CardStyledProps = {
    isPremium: boolean
}

export const CardStyled = styled.div<CardStyledProps>`
    padding: 1rem;
    margin: 0.5rem;
    border: 1px solid ${props => props.isPremium ? COLORS.golden : COLORS.lightgray};
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    background: white;

    -webkit-box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.15);
`

export const CardImageWrapper = styled.div`
    width: 180px;
    height: 180px;
    img {
        width: 100%;
        height: 100%;
        object-position: center;
        object-fit: cover;
    }
`

export const CardContent = styled.div`
    display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
`

export const CardContentLeft = styled.div`
    padding: 0 1rem;
`

export const CardContentRight = styled.div`
display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
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
    font-size: 1.6rem;
`

export const PremiumTag = styled.div`
    color: ${COLORS.golden};
`