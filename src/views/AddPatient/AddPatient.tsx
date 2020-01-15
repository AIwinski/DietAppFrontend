import React, { useEffect, useState } from "react";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import Loader from "../../components/Loader/Loader";
import { AddPatientStyled, AddPatientStyledInner } from "./AddPatient.styled";
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
import { Formik } from "formik";
import * as Yup from "yup";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Profile, Patient } from "../../api";
import { push } from "connected-react-router";

const addPatientValidationSchema = Yup.object().shape({
    therapyGoal: Yup.string().required("Cel terapii jest wymagany"),
    age: Yup.number()
        .integer("Wiek musi być wartością liczbową")
        .required("Wiek jest wymagany"),
    gender: Yup.string().required("Płeć jest wymagana"),
    firstName: Yup.string().required("Imię jest wymagane"),
    lastName: Yup.string().required("Nazwisko jest wymagane")
});

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {} & RouteComponentProps;

const AddPatient = (props: Props) => {
    const [inProgress, setInProgress] = useState(false);
    const [userData, setUserData] = useState();

    let userId: any = null;

    if (props.location) {
        userId = props.location.state ? props.location.state.userAccountId : null;
    }

    useEffect(() => {
        if (userId) {
            Profile.getUser(userId)
                .then(res => {
                    console.log(res);
                    setUserData(res.data.user);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <AddPatientStyled>
            <ContainerFluid>
                <AddPatientStyledInner>
                    <Formik
                        initialValues={{ therapyGoal: "", age: "", gender: "", firstName: "", lastName: "" }}
                        validationSchema={addPatientValidationSchema}
                        onSubmit={values => {
                            if (props.currentUser.accountType !== "doctor") {
                                return;
                            }
                            setInProgress(true);

                            const data = {
                                ...values,
                                userAccountId: userId
                            };

                            Patient.addPatient(data)
                                .then(res => {
                                    console.log(res);
                                    props.push("/patient-details/" + res.data.patient.id);
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                                .finally(() => {
                                    setInProgress(false);
                                });
                        }}
                    >
                        <FormStyled>
                            {inProgress && <FormInfoContainer>{<Loader />}</FormInfoContainer>}

                            <FormInfo>Dodaj nowego pacjenta {userId}</FormInfo>
                            <FormGroup>
                                <LabelStyled htmlFor="firstName">Imię</LabelStyled>
                                <FieldStyled id="firstName" name="firstName" placeholder="Imię" />
                                <ErrorMessageStyled name="firstName" component="div" />
                            </FormGroup>
                            <FormGroup>
                                <LabelStyled htmlFor="lastName">Nazwisko</LabelStyled>
                                <FieldStyled name="lastName" placeholder="Nazwisko" id="lastName" />
                                <ErrorMessageStyled name="lastName" component="div" />
                            </FormGroup>
                            <FormGroup>
                                <LabelStyled htmlFor="age">Wiek</LabelStyled>
                                <FieldStyled name="age" placeholder="Wiek" id="age" />
                                <ErrorMessageStyled name="age" component="div" />
                            </FormGroup>
                            <FormGroup>
                                <LabelStyled htmlFor="gender">Płeć (M/K)</LabelStyled>
                                <FieldStyled name="gender" placeholder="Płeć (M/K)" id="gender" />
                                <ErrorMessageStyled name="gender" component="div" />
                            </FormGroup>
                            <FormGroup>
                                <LabelStyled htmlFor="therapyGoal">Cel terapii</LabelStyled>
                                <FieldStyled name="therapyGoal" placeholder="Cel terapii" id="therapyGoal" />
                                <ErrorMessageStyled name="therapyGoal" component="div" />
                            </FormGroup>
                            <FormGroup>
                                <SubmitButton type="submit">Dodaj pacjenta</SubmitButton>
                            </FormGroup>
                        </FormStyled>
                    </Formik>
                </AddPatientStyledInner>
            </ContainerFluid>
        </AddPatientStyled>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return { currentUser: state.auth.currentUser };
};

const mapDispatchToProps = {
    push
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPatient);
