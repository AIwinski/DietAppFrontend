import styled from 'styled-components';

export const PriceListElementStyled = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: row;
`

export const Name = styled.div`
    border: 1px solid red;
    padding: 1rem;
    flex: 1;
`

export const Price = styled.div`
    border: 1px solid red;
    padding: 1rem;
    flex: 1;
`

export const DeleteButton = styled.button`
    border: 1px solid red;
    padding: 1rem;

    &:hover {
        cursor: pointer;
    }
`