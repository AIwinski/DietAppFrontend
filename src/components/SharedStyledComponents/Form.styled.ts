import styled from "styled-components";
import { Form, Field, ErrorMessage } from "formik";
import { COLORS, BREAKPOINTS } from "../../styles/variables";

export const InfoBadge = styled.span`
    width: 100%;
    padding: 0.8rem;
    border-radius: 5px;
    font-size: 1.4rem;
    background: #fff87d;
`;

export const ErrorBadge = styled.span`
    width: 100%;
    padding: 0.8rem;
    font-size: 1.4rem;
    border-radius: 5px;
    color: white;
    background: #ff4230;
`;

export const FormStyled = styled(Form)`
    -webkit-box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    font-size: 1.5rem;
    width: 50%;

    @media (max-width: ${BREAKPOINTS.md}) {
        padding: 1rem;
        width: 80%;
    }
    @media (max-width: ${BREAKPOINTS.sm}) {
        padding: 1rem;
        width: 100%;
    }
`;

export const FormGroup = styled.div`
    margin-top: 1rem;
    width: 100%;
    position: relative;
`;

export const FormGroup2 = styled.div`
    margin-top: 1rem;
    width: 100%;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
`

export const FieldStyled = styled(Field)`
    width: 100%;
    background: none;
    border: none;
    box-sizing: border-box;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: all 0.2s;

    :focus {
        outline: none;
        border: 1px solid ${COLORS.blue};
        box-shadow: 0 0 5px ${COLORS.blue};
    }

    &[type="radio"] {
        outline: none;
        border: none;
        box-shadow: none;
        cursor: pointer;
        width: 1.6rem;
        height: 1.6rem;
    }
`;

export const ErrorMessageStyled = styled(ErrorMessage)`
    box-sizing: border-box;
    width: 100%;
    color: red;
    padding: 0 0.8rem;
    font-size: 1.2rem;
`;

export const LabelStyled = styled.label`
    box-sizing: border-box;
    display: block;
    width: 100%;
    padding: 0 0.8rem;
    font-size: 1.2rem;
`;

type SubmitButtonProps = {
    light?: boolean
}

export const SubmitButton = styled.button<SubmitButtonProps>`
    width: 100%;
    background: none;
    border: none;
    padding: 1rem 2rem;
    color: white;
    cursor: pointer;
    background: ${COLORS.blue};
    border-radius: 5px;
    transition: background 0.2s;

    :hover {
        background: ${COLORS.darkblue};
    }

    ${({ light }) =>
        light && `
            background: #226aff;
            :hover {
                background: #042bfc;
            }
        `
    }
`;

export const FormInfo = styled.div`
    width: 100%;
    font-weight: bold;
`;

export const Option = styled.option`
    
`
export const FormInfoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-bottom: 1rem;
`