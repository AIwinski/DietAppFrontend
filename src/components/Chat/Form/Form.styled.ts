import styled from "styled-components";
import { Field } from "formik";

export const ChatSubmitButton = styled.button`
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: bold;
    background: none;
    width: 4rem;
    height: 4rem;
    border: 2px solid black;
    border-radius: 20px;
`;

export const ChatTextArea = styled(Field)`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    resize: none;
    padding: 0.5rem;
    padding-right: 6rem;
    border: none;
    display: block;
`;

export const AddFile = styled.input`
    position: absolute;
    top: 10px;
    left: 20px;
    cursor: pointer;
`;
