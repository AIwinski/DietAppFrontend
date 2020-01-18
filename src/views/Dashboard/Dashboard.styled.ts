import styled from 'styled-components'
import { BREAKPOINTS, COLORS } from '../../styles/variables'
import { Link } from 'react-router-dom'

export const DashboardStyled = styled.div`
    min-height: 100vh;
    position: relative;
`

export const DashboardStyledInner = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 1rem;
`

export const NotesList = styled.div`
    border: 1px solid #eee;
    padding: 0.5rem;
    border-radius: 6px;
`

export const PatientList = styled.div`
    border: 1px solid #eee;
    padding: 0.5rem;
    border-radius: 6px;
    width: 100%;
`

export const PatientCard = styled.div`
    border: 1px solid #ddd;
    padding: 0.5rem;
    border-radius: 6px;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;

    :hover {
        background: #f3f3f3;
    }
`

export const NotesAndPatientsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
    border: 1px solid #ccc;
    padding: 0.5rem;

    @media (max-width: ${BREAKPOINTS.md}) {
        grid-template-columns: 1fr;
        padding: 0;
    }
`

export const Container = styled.div`
    border: 1px solid #ccc;
    padding: 0.5rem;
`

export const AddPatientButton = styled(Link)`
    width: 100%;
    background: none;
    border: none;
    padding: 1rem 2rem;
    color: white;
    cursor: pointer;
    background: ${COLORS.blue};
    border-radius: 5px;
    transition: background 0.2s;
    text-decoration: none;
    display: block;
    text-align: center;
    margin: 0.5rem 0;
    font-size: 1.4rem;

    :hover {
        background: ${COLORS.darkblue};
    }
`