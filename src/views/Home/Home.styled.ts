import styled from "styled-components"
import { NAV_HEADROOM, COLORS, BREAKPOINTS } from "../../styles/variables"
import { HashLink } from 'react-router-hash-link';

export const HomePageStyled = styled.div`
    
`

export const HomeInner = styled.div`
    width: 100%;
`

export const HomeHero = styled.div`
    min-height: calc(100vh - ${NAV_HEADROOM});
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    position: relative;
`

export const HomeTitle = styled.div`
    font-weight: bold;
    font-size: 5rem;
    line-height: 5rem;
    margin-bottom: 2.5rem;
    color: ${COLORS.blue};
    display: flex;
    align-items: center;
`

export const HomeText = styled.div`
    font-size: 2.6rem;
    margin-bottom: 2.5rem;
`

export const LoggedInBadge = styled.span`

`

export const SearchInputWrapper = styled.div`
    width: 40%;
    padding-bottom: ${NAV_HEADROOM};

    @media (max-width: ${BREAKPOINTS.md}) {
        width: 75%;
    }

    @media (max-width: ${BREAKPOINTS.sm}) {
        width: 100%;
    }
`

export const ScrollButton = styled(HashLink)`
    position: absolute;
    bottom: 2rem;
    left: 50%;
    color: ${COLORS.blue};
    cursor: pointer;
    font-size: 4rem;
    outline: none;
`

export const InfoSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
    padding: 2rem 0;
    border-top: 1px solid #ddd;

    @media (max-width: ${BREAKPOINTS.md}) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: ${BREAKPOINTS.sm}) {
        grid-template-columns: 1fr;
    }
`

export const InfoCard = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border: 2px solid ${COLORS.blue};
    border-radius: 1rem;
`

export const InfoCardIcon = styled.div`
    color: ${COLORS.blue};
    font-size: 5rem;
    padding-bottom: 1.5rem;
`

export const InfoCardText = styled.div`
    width: 100%;
    text-align: justify;
`

export const PopularProfiles = styled.div`
    padding: 2rem 0;
    border-top: 1px solid #ddd;
    position: relative;
`

export const PopularProfilesInner = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;

    @media (max-width: ${BREAKPOINTS.md}) {
        grid-template-columns: 1fr;
    }
    
`

export const SectionTitle = styled.div`
    color: ${COLORS.darkblue};
    padding: 1rem 0;
    padding-left: 1rem;
    font-size: 2rem;
`

export const PopularProfilesCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    border: 2px solid ${COLORS.blue};
    border-radius: 1rem;
`

export const PopularProfilesCardName = styled.div`
    color: ${COLORS.blue};
    font-size: 2.2rem;
    padding: 1rem 0;
`

export const PopularProfilesCardCity = styled.div`
    color: ${COLORS.black};
    font-size: 1.4rem;
    padding-bottom: 1rem;
`

export const LogSection = styled.div`
    padding: 2rem 0;
    border-top: 1px solid #ddd;
`
