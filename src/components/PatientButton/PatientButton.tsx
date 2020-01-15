import React, { useState, useEffect } from "react";
import { AddPatientButtonStyled, Wrapper, OpenPatientButton } from "./PatientButton.styled";
import { Patient } from "../../api";
import Loader from "../Loader/Loader";

type Props = {
    userAccountId: string;
};

const PatientButton = (props: Props) => {
    const [isFetching, setIsFetching] = useState(true);
    const [patients, setPatients] = useState([] as any[]);

    useEffect(() => {
        Patient.getPatients()
            .then(res => {
                console.log(res.data.patients);
                setPatients(res.data.patients);
                setIsFetching(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <Wrapper>
            {isFetching ? (
                <Loader></Loader>
            ) : patients.map(p => String(p.userAccountId)).includes(String(props.userAccountId)) ? (
                <OpenPatientButton to={"/patient-details/" + patients.find(p => String(p.userAccountId)).id}>
                    Szczegoly pacjenta
                </OpenPatientButton>
            ) : (
                <AddPatientButtonStyled to={{ pathname: "/add-patient", state: { userAccountId: props.userAccountId } }}>
                    Dodaj pacjenta
                </AddPatientButtonStyled>
            )}
        </Wrapper>
    );
};

export default PatientButton;
