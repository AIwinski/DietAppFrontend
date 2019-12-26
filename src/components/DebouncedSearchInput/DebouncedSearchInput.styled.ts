import styled from "styled-components";
import { COLORS } from "../../styles/variables";

export const Form = styled.form`
    margin: 1rem;
    position: relative;
`;

export type InputProps = {
    formHasResults: boolean
}

export const Input = styled.input<InputProps>`
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
    border-radius: 20px;
    border: 1px solid ${COLORS.lightgray};
    height: 40px;
    ${props =>
        props.formHasResults &&
        `
    border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;`}
`;

export const ResultsContainer = styled.div`
    z-index: 1;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`;

export type ResultsElementProps = {
    selected: boolean
}

export const ResultsElement = styled.div<ResultsElementProps>`
    box-sizing: border-box;
    padding: 1rem;
    background: ${props => (props.selected ? COLORS.white : COLORS.lightgray)};

    &:last-of-type {
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    &:hover {
        cursor: pointer;
        background: #ddd;
    }
`;
