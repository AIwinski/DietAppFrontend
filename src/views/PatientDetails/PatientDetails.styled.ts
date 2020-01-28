import styled from 'styled-components';
import { BREAKPOINTS } from '../../styles/variables';

export const PatientDetailsStyled = styled.div`

`

export const PatientDetailsStyledInner = styled.div`

`

export const PageTitle = styled.div`
    font-weight: bold;
`

export const PatientInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 6px;
    margin: 1rem 0;
`

export const ImageWrapper = styled.div`
    width: 16rem;
    height: 16rem;
`

export const PatientInfoInner = styled.div`
    height: 16rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 0.5rem;
`

export const InfoBadge = styled.div`
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 6px;
`

export const UserExistInfo = styled.div`

`

export const UserDoesNotExistInfo = styled.div`

`

export const Age = styled.div`

`

export const Gender = styled.div`

`

export const TherapyGoal = styled.div`

`

export const DataSetWrapper = styled.div`
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0.5rem;
`

export const DataSetInner = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 0.5rem;
    margin-bottom: 0.5rem;

    @media (max-width: ${BREAKPOINTS.md}) {
        grid-template-columns: 1fr;
        padding: 0;
    }
    
`

export const DeleteDataSet = styled.div`
    color: red;
    cursor: pointer;
`

export const DataSetsContainer = styled.div`
    border: 1px solid #ddd;
    padding: 1rem;
`

export const DataSetTableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #eee;
    padding: 0.5rem;
    border-radius: 6px;
    max-height: 350px;
    overflow-y: scroll;
`

export const DataSetChartWrapper = styled.div`
    border: 1px solid #eee;
    height: 350px;
    border-radius: 6px;
`

export const DataSetFormWrapper = styled.div`
    border-top: 1px solid #ccc;
`

export const Table = styled.table`
    width: 100%;
    border-bottom: 1px soid #ccc;
`

export const StyledTr = styled.tr`
    border-bottom: 1px soid #ccc;
`

export const StyledTh = styled.th`
    border: 2px solid #eee;
`

export const StyledTd = styled.td`
    padding: 0.2rem;
    font-size: 1.2rem;
    vertical-align: middle;
    text-align: center;
`

export const DataSetInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0.5rem;
    grid-gap: 0.5rem;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
    border-radius: 6px;

    @media (max-width: ${BREAKPOINTS.md}) {
        grid-template-columns: 1fr;
        padding: 0;
    }
`

export const DataSetDescription = styled.div`

`

export const DataSetTitle = styled.div`
    font-weight: bold;
    font-size: 2rem;
`

export const DataSetUnit = styled.div`

`
