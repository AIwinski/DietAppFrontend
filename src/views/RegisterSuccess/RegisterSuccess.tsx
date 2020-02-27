import React from "react";
import { RegisterSuccessStyled } from "./RegisterSuccess.styled";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const RegisterSuccess = () => {
    useDocumentTitle("Mój Lekarz - Zarejestrowano pomyślnie");;

    return (
        <RegisterSuccessStyled>
            <ContainerFluid>
                Zarejestrowano pomyślnie!
            </ContainerFluid>
        </RegisterSuccessStyled>
    );
};

export default RegisterSuccess;
