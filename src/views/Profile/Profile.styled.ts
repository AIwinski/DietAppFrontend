import styled from 'styled-components'
import { COLORS } from '../../styles/variables'
import { Link } from "react-router-dom"

export const ProfileStyled = styled.div`
    border: 1px solid red;
`

export const AlertStyled = styled.div`
    border: 1px solid red;
    padding: 1rem;
    border-radius: 5px;
`

export const ContactButton = styled(Link)`
    text-decoration: none !important;
    border: 2px solid ${COLORS.blue};
    color: white !important;
    background: ${COLORS.blue};
    border-radius: 4px;
    padding: 0.5rem;
    display: inline-block;
    width: 100px;
`

export const MainWrapper = styled.div`
    display: grid;
    grid-template-columns: 120px 1fr 1fr;
`

export const AvatarImage = styled.div`
`

export const GeneralInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    justify-content: space-between;
`

export const Name = styled.span`

`

export const City = styled.span`

`

export const Description = styled.div`

`

export const MainRating = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
`

export const ProfileMain = styled.div`

`

export const ProfileGallery = styled.div`

`

export const ProfileSection = styled.div`
    border: 1px solid #ddd;
    border-radius: 6px;
    background: white;
    padding: 1rem;
    margin-bottom: 0.5rem;
    position: relative;
`
export const ElementMissingInfo = styled.div`

`

export const Info = styled.span`
    color: ${COLORS.blue};
    font-size: 2rem;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    width: 100%;
    margin-bottom: 0.5rem;
    padding-bottom: 0.3rem;
    display: block;
`