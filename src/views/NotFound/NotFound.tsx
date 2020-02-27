import React from 'react'
import { NotFoundStyled } from './NotFound.styled'
import useDocumentTitle from '../../hooks/useDocumentTitle';

const NotFound = () => {
    useDocumentTitle("Mój Lekarz - Strony nie znaleziono");
    return (
        <NotFoundStyled>
            Nie znaleziono strony
        </NotFoundStyled>
    )
}

export default NotFound
