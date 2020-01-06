import styled from "styled-components";
import { Field } from "formik";
import { COLORS } from "../../../styles/variables";

export const ChatSubmitButton = styled.button`
    cursor: pointer;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.2rem;
    color: ${COLORS.darkblue};
    border: none;
    background: none;
`;

export const ChatTextArea = styled(Field)`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    resize: none;
    padding: 1rem;
    padding-right: 6rem;
    border: none;
    display: block;
    border-top: 1px solid #ddd;
`;

export const AddFile = styled.input`
    display: none;
`;

export const AddFileLabel = styled.label`
    cursor: pointer;
    font-size: 1.2rem;
    color: ${COLORS.darkblue};
`

export const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 1rem;
`

export const Label = styled.span`
    padding: 0 0.5rem;
`