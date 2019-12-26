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
        .email("Invalid email")
        .required("Required"),
    password: Yup.string().required("Password is required"),
    passwordConfirm: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    displayName: Yup.string()
        .required("Nick is required")
        .min(3, "Minimum length of nick is 3 characters")
        .max(50, "Maximum length of nick is 50 characters")
});

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const Register = (props: Props) => {
    useDocumentTitle("Register");

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
                                    <LabelStyled htmlFor="displayName">Nick</LabelStyled>
                                    <FieldStyled name="displayName" id="displayName" placeholder="Display name" />

                                    <ErrorMessageStyled name="displayName" component="div" />
                                </FormGroup>
                                <FormGroup>
                                    <LabelStyled htmlFor="password">Password</LabelStyled>
                                    <FieldStyled name="password" id="password" placeholder="Password" type="password" />

                                    <ErrorMessageStyled name="password" component="div" />
                                </FormGroup>
                                <FormGroup>
                                    <LabelStyled htmlFor="passwordConfirm">Confirm password</LabelStyled>
                                    <FieldStyled
                                        name="passwordConfirm"
                                        id="passwordConfirm"
                                        placeholder="Confirm password"
                                        type="password"
                                    />

                                    <ErrorMessageStyled name="passwordConfirm" component="div" />
                                </FormGroup>
                                <FormGroup>
                                    <SubmitButton type="submit">Register</SubmitButton>
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
