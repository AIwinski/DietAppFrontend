import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import { ApplicationState, store } from "../../store/index";
import { registerRequest, resetAuthError } from "../../store/auth/actions";
import { push } from "redux-first-history";

import {
    FormStyled,
    FormInfo,
    FormGroup,
    LabelStyled,
    SubmitButton,
    FieldStyled,
    ErrorMessageStyled,
    InfoBadge,
    ErrorBadge,
    FormInfoContainer,
    FormGroup2
} from "../../components/SharedStyledComponents/Form.styled";
import { RegisterPageStyled, RegisterPageStyledInner } from "./Register.styled";
import Loader from "../../components/Loader/Loader";
import { RegisterProps, Chat } from "../../api";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";

const RegisterValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Nieprawidłowy email")
        .required("Pole email jest wymagane"),
    password: Yup.string().required("Pole hasło jest wymagane"),
    passwordConfirm: Yup.string()
        .required("Pole powtórz hasło jest wymagane")
        .oneOf([Yup.ref("password"), null], "Hasła muszą się zgadzać"),
    displayName: Yup.string()
        .required("Nazwa użytkownika jest wymagana")
        .min(3, "Nazwa musi mieć długość minimum 3 znaków")
        .max(50, "Nazwa może mieć długość maksymalnie 50 znaków")
});

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const Register = (props: Props) => {
    useDocumentTitle("Mój Lekarz - Rejestracja");

    useEffect(() => {
        return () => {
            props.resetAuthError();
        };
    }, []);

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                passwordConfirm: "",
                displayName: "",
                accountType: "patient"
            }}
            validationSchema={RegisterValidationSchema}
            onSubmit={(values: any) => {
                console.log(values);
                const registerProps: RegisterProps = {
                    email: values.email,
                    displayName: values.displayName,
                    password: values.password,
                    accountType: values.accountType
                };
                props.registerRequest(registerProps);
            }}
            render={({ values, setFieldValue }) => (
                <RegisterPageStyled>
                    <ContainerFluid>
                        <RegisterPageStyledInner>
                            <FormStyled>
                                {(props.isRegistering || props.error) && (
                                    <FormInfoContainer>
                                        {props.isRegistering && <Loader />}
                                        {props.error && <ErrorBadge>Rejestracja nie powiodła się.</ErrorBadge>}
                                    </FormInfoContainer>
                                )}
                                <FormInfo>Zarejestruj się</FormInfo>
                                <FormGroup>
                                    <LabelStyled htmlFor="accountType">Typ konta</LabelStyled>
                                    <FormGroup2>
                                        <LabelStyled htmlFor="accountType">Jako lekarz</LabelStyled>
                                        <FieldStyled
                                            name="accountType"
                                            checked={values.accountType === "doctor"}
                                            onChange={() => setFieldValue("accountType", "doctor")}
                                            type="radio"
                                            value="doctor"
                                        />
                                        <LabelStyled htmlFor="accountType">Jako pacjent</LabelStyled>
                                        <FieldStyled
                                            name="accountType"
                                            checked={values.accountType === "patient"}
                                            onChange={() => setFieldValue("accountType", "patient")}
                                            type="radio"
                                            value="patient"
                                        />
                                    </FormGroup2>
                                </FormGroup>

                                <FormGroup>
                                    <LabelStyled htmlFor="email">Email</LabelStyled>
                                    <FieldStyled name="email" id="email" placeholder="Email" type="email" />

                                    <ErrorMessageStyled name="email" component="div" />
                                </FormGroup>
                                <FormGroup>
                                    <LabelStyled htmlFor="displayName">Nazwa użytkownika</LabelStyled>
                                    <FieldStyled name="displayName" id="displayName" placeholder="Nazwa użytkownika" />

                                    <ErrorMessageStyled name="displayName" component="div" />
                                </FormGroup>
                                <FormGroup>
                                    <LabelStyled htmlFor="password">Hasło</LabelStyled>
                                    <FieldStyled name="password" id="password" placeholder="Hasło" type="password" />

                                    <ErrorMessageStyled name="password" component="div" />
                                </FormGroup>
                                <FormGroup>
                                    <LabelStyled htmlFor="passwordConfirm">Powtórz hasło</LabelStyled>
                                    <FieldStyled
                                        name="passwordConfirm"
                                        id="passwordConfirm"
                                        placeholder="Powtórz hasło"
                                        type="password"
                                    />

                                    <ErrorMessageStyled name="passwordConfirm" component="div" />
                                </FormGroup>
                                <FormGroup>
                                    <SubmitButton type="submit">Zarejestruj się</SubmitButton>
                                </FormGroup>
                            </FormStyled>
                        </RegisterPageStyledInner>
                    </ContainerFluid>
                </RegisterPageStyled>
            )}
        />
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return { isRegistering: state.auth.isRegistering, error: state.auth.error };
};

const mapDispatchToProps = {
    registerRequest,
    resetAuthError,
    push
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
