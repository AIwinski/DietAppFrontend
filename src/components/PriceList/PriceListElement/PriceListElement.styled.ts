import styled from 'styled-components';

export const PriceListElementStyled = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: row;
    border-radius: 4px;
    border: 1px solid #eee;
`

export const Name = styled.div`
    padding: 1rem;
    flex: 1;
    border-right: 2px solid #ddd;
`

export const Price = styled.div`
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