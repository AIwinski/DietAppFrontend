import React from "react";
import { Formik } from "formik";
import { AddDataSetStyled } from "./AddDataSet.styled";
import { SubmitButton, FormGroup, LabelStyled, FieldStyled } from "../../SharedStyledComponents/Form.styled";
import { Patient } from "../../../api";

type Props = {
    patientId: string;
    onDataSetAdd: (note: any) => void;
};

const AddDataSet = (props: Props) => {
    return (
        <Formik
            initialValues={{
                title: "",
                descr: "",
                unit: "",
                dataType: ""
            }}
            onSubmit={values => {
                console.log(values);
                Patient.addDataSet(props.patientId, {
                    ...values
                })
                    .then(res => {
                        console.log(res);
                        props.onDataSetAdd(res.data.dataSet);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }}
            render={() => (
                <AddDataSetStyled>
                    <FormGroup>
                        <LabelStyled htmlFor="title">Tytuł</LabelStyled>
                        <FieldStyled name="title" placeholder="Tytuł..." id="title" />
                    </FormGroup>
                    <FormGroup>
                        <LabelStyled htmlFor="descr">Opis</LabelStyled>
                        <FieldStyled name="descr" placeholder="Opis..." id="descr" />
                    </FormGroup>
                    <FormGroup>
                        <LabelStyled htmlFor="unit">Jednostka</LabelStyled>
                        <FieldStyled name="unit" placeholder="Jednostka..." id="unit" />
                    </FormGroup>
                    <FormGroup>
                        <LabelStyled htmlFor="dataType">Typ danych</LabelStyled>
                        <FieldStyled name="dataType" placeholder="Typ danych..." id="dataType" />
                    </FormGroup>

                    <SubmitButton type="submit">Dodaj zbiór danych</SubmitButton>
                </AddDataSetStyled>
            )}
        />
    );
};

export default AddDataSet;
