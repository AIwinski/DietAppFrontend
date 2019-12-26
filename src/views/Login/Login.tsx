import React, { useState, useEffect } from "react";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";

import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import { loginRequest, resetAuthError } from "../../store/auth/actions";
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
    FormInfoContainer
} from "../../components/SharedStyledComponents/Form.styled";
//@ts-ignore
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { LoginPageStyled, LoginPageStyledInner, OrBadge } from "./Login.styled";
import { ApplicationState } from "../../store";
import Loader from "../../components/Loader/Loader";
import { LoginTypes } from "../../api";
import { RouteComponentProps } from "react-router";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Wrong email")
        .required("Email is required"),
    password: Yup.string().required("Password is required")
});

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps;

const Login = (props: Props) => {
    useDocumentTitle("Login");
    let from: any = null;

    if (props.location) {
        from = props.location.state ? props.location.state.from : null;
    }

    const [showLoginFirstMessage, setShowLoginFirstMessage] = useState(
        (props.location.state && props.location.state.showLoginFirstMessage) || false
    );

    useEffect(() => {
        return () => {
            props.resetAuthError();
        };
    }, []);

    const responseFacebook = (res: any) => {
        const data = {
            access_token: res.accessToken
        };
        setShowLoginFirstMessage(false);
        props.resetAuthError();
        props.loginRequest({ data: data, loginType: LoginTypes.facebook, from: from });
    };

    return (
        <LoginPageStyled>
            <ContainerFluid>
                <LoginPageStyledInner>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={loginValidationSchema}
                        onSubmit={values => {
                            setShowLoginFirstMessage(false);
                            props.resetAuthError();
                            props.loginRequest({ data: values, loginType: LoginTypes.local, from: from });
                        }}
                    >
                        <FormStyled>
                            {(props.isLoggingIn || props.error || showLoginFirstMessage) && (
                                <FormInfoContainer>
                                    {props.isLoggingIn && <Loader />}
                                    {props.error && <ErrorBadge>Logowanie nie powiodło się.</ErrorBadge>}
                                    {showLoginFirstMessage && <InfoBadge>Musisz się najpierw zalogować.</InfoBadge>}
                                </FormInfoContainer>
                            )}

                            <FormInfo>Zaloguj się</FormInfo>
                            <FormGroup>
                                <LabelStyled htmlFor="email">Email</LabelStyled>
                                <FieldStyled id="email" name="email" placeholder="Email" />
                                <ErrorMessageStyled name="email" component="div" />
                            </FormGroup>
                            <FormGroup>
                                <LabelStyled htmlFor="password">Password</LabelStyled>
                                <FieldStyled name="password" type="password" placeholder="password" id="password" />
                                <ErrorMessageStyled name="password" component="div" />
                            </FormGroup>
                            <FormGroup>
                                <SubmitButton type="submit">Zaloguj się</SubmitButton>
                                <OrBadge>lub</OrBadge>
                                <FacebookLogin
                                    appId="1468438129978514"
                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                    render={(renderProps: any) => (
                                        <SubmitButton onClick={renderProps.onClick} light>
                                            Zaloguj się za pomocą facebooka <i className="facebook-f"></i>
                                        </SubmitButton>
                                    )}
                                />
                            </FormGroup>
                        </FormStyled>
                    </Formik>
                </LoginPageStyledInner>
            </ContainerFluid>
        </LoginPageStyled>
    );
};

const mapDispatchToProps = {
    loginRequest,
    resetAuthError
};

const mapStateToProps = (state: ApplicationState) => {
    return { isLoggingIn: state.auth.isLoggingIn, error: state.auth.error };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
