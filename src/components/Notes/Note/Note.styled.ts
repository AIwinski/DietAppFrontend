import styled from 'styled-components'

export const NoteStyled = styled.div`
    border: 1px solid #ddd;
    padding: 0.5rem;
    position: relative;
    margin-bottom: 0.5rem;
    :hover {
        background: #f3f3f3;
    }
`

export const DateBadge = styled.div`
    font-size: 1.2rem;
    color: #333;
`

export const Content = styled.div`
    font-size: 1.6rem;
`

export const DeleteButton = styled.p`
    font-size: 12px;
    border: none;
    background: #d11;
    color: white;
    border-radius: 6px;
    font-weight: bold;
    width: 2.4rem;
    height: 2.4rem;
    cursor: pointer;
    vertical-align: middle;
    text-align: center;
    display: inline-block;
    padding-bottom: 1rem;
`

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #ddd;
`