import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { COLORS } from '../../styles/variables'

export const Wrapper = styled.div`
    width: 2.6rem;
    height: 2.6rem;
    padding: 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Toggle = styled.button`
    display: block;
    border: none;
    width: 2.6rem;
    height: 2.6rem;
    cursor: pointer;
    padding: 0;
    margin: 0;
    border-radius: 100%;
    background: ${COLORS.white};
    color: ${COLORS.blue};
    font-size: 2.2rem;
    outline: none;
`

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 120%;
    right: 0;
    width: 12rem;

    box-shadow:
  0 4.5px 10px rgba(0, 0, 0, 0.078),
  0 9px 80px rgba(0, 0, 0, 0.12)
;

    border: 1px solid #eee;

`

export const LinkElement = styled(Link)`
    padding: 0.5rem;
    width: 100%;
    font-size: 1.4rem;
    border-bottom: 1px solid #eee;
    background: ${COLORS.white};
    text-decoration: none;
    color: ${COLORS.blue};
    text-align: center;

    &:hover {
        background: #ddd;
        cursor: pointer;
    }

`