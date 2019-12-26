import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { COLORS } from '../../styles/variables'

export const Wrapper = styled.div`
    border: 1px solid red;
    width: 100px;
    border-radius: 2px;
    border: 1px solid #eee;
    padding: 0;
    position: relative;
`

export const Toggle = styled.button`
    display: block;
    border: 1px solid #eee;
    width: 100%;
    height: 100%;
    cursor: pointer;
    padding: 0;
    margin: 0;
    border-radius: 2px;
    background: ${COLORS.white};
`

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 0;
`

export const LinkElement = styled(Link)`
    padding: 0.5rem;
    width: 100%;
    font-size: 1.5rem;
    border-bottom: 1px solid #eee;

    &:hover {
        background: #ddd;
        cursor: pointer;
    }

`