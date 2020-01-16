import React from "react";
import { Formik } from "formik";
import { AddDataStyled } from "./AddData.styled";
import { SubmitButton, FormGroup, LabelStyled, FieldStyled } from "../../SharedStyledComponents/Form.styled";
import { Patient } from "../../../api";

type Props = {
    dataSetId: string;
    onDataValueAdd: (note: any) => void;
};

const AddData = (props: Props) => {
    return (
        <Formik
            initialValues={{
                dataValue: "",
                dateValue: ""
            }}
            onSubmit={values => {
                console.log(values);
                Patient.addDataValue({
                    dataSetId: props.dataSetId,
                    dataValue: values.dataValue,
                    dateValue: Date.parse(values.dateValue)
                })
                    .then(res => {
                        console.log(res);
                        props.onDataValueAdd(res.data.dataValue);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }}
            render={() => (
                <AddDataStyled>
                    <FormGroup>
                        <LabelStyled htmlFor="dataValue">Wartość</LabelStyled>
                        <FieldStyled name="dataValue" placeholder="Wartość..." id="dataValue" />
                    </FormGroup>
                    <FormGroup>
                        <LabelStyled htmlFor="dateValue">Data</LabelStyled>
                        <FieldStyled type="date" name="dateValue" placeholder="Data..." id="dateValue" />
                    </FormGroup>

                    <SubmitButton type="submit">Dodaj dane do zbioru</SubmitButton>
                </AddDataStyled>
            )}
        />
    );
};

export default AddData;
