import React from "react";
import { RegisterSuccessStyled } from "./RegisterSuccess.styled";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const RegisterSuccess = () => {
    useDocumentTitle("Register - success");

    return (
        <RegisterSuccessStyled>
            <ContainerFluid>
                REGISTER SUCCESS
            </ContainerFluid>
        </RegisterSuccessStyled>
    );
};

export default RegisterSuccess;
