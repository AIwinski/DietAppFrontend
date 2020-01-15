import React, { useEffect, useState } from "react";
import {
    PatientDetailsStyled,
    PatientDetailsStyledInner,
    PageTitle,
    PatientInfoInner,
    PatientInfo,
    Age,
    Gender,
    ImageWrapper,
    InfoBadge,
    UserExistInfo,
    UserDoesNotExistInfo
} from "./PatientDetails.styled";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import { Patient } from "../../api";
import { RouteComponentProps } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import { Name } from "../Profile/Profile.styled";
import Loader from "../../components/Loader/Loader";

interface MatchParams {
    id: string;
}

type Props = RouteComponentProps<MatchParams> & {};

const PatientDetails = (props: Props) => {
    const [isPatientFetching, setPatientFetching] = useState(true);
    const [patient, setPatient] = useState();

    useEffect(() => {
        Patient.getPatient(props.match.params.id)
            .then(res => {
                console.log(res);
                setPatient(res.data.patient);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setPatientFetching(false);
            });
    }, []);

    return (
        <PatientDetailsStyled>
            <ContainerFluid>
                <PatientDetailsStyledInner>
                    <PageTitle>Szczegóły pacjenta</PageTitle>

                    {!isPatientFetching && patient ? (
                        <React.Fragment>
                            <InfoBadge>
                                {patient.userAccount ? (
                                    <UserExistInfo>User istnieje</UserExistInfo>
                                ) : (
                                    <UserDoesNotExistInfo>User does not</UserDoesNotExistInfo>
                                )}
                            </InfoBadge>
                            <PatientInfo>
                                <ImageWrapper>
                                    <Avatar isFull={true}></Avatar>
                                </ImageWrapper>
                                <PatientInfoInner>
                                    <Name>{patient.firstName + " " + patient.lastName}</Name>
                                    <Age>{patient.age}</Age>
                                    <Gender>{patient.gender}</Gender>
                                </PatientInfoInner>
                            </PatientInfo>
                        </React.Fragment>
                    ) : (
                        <Loader></Loader>
                    )}
                </PatientDetailsStyledInner>
            </ContainerFluid>
        </PatientDetailsStyled>
    );
};

export default PatientDetails;
