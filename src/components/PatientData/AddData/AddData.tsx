import React from "react";
import { Formik } from "formik";
import { AddDataStyled } from "./AddData.styled";
import { SubmitButton, FormGroup, LabelStyled, FieldStyled, ErrorMessageStyled } from "../../SharedStyledComponents/Form.styled";
import { Patient } from "../../../api";
import * as Yup from "yup";
import moment from "moment";

const addDataValidationSchema = Yup.object().shape({
    dataValue: Yup.number()
        .typeError("Wartość musi być liczbą")
        .required("Wartość jest wymagana")
});

type Props = {
    dataSetId: string;
    onDataValueAdd: (note: any) => void;
};

const AddData = (props: Props) => {
    return (
        <Formik
            initialValues={{
                dataValue: "",
                dateValue: moment().format("DD-MM-YYYY HH:mm")
            }}
            validationSchema={addDataValidationSchema}
            onSubmit={(values, { setFieldError, setValues, resetForm }) => {
                console.log(values);
                let dateValue = moment(values.dateValue, "DD-MM-YYYY HH:mm", true);
                if (!dateValue.isValid()) {
                    setFieldError("dateValue", "Niepoprawny format daty");
                    return;
                }
                Patient.addDataValue({
                    dataSetId: props.dataSetId,
                    dataValue: values.dataValue,
                    dateValue: moment(dateValue.toDate().getTime())
                })
                    .then(res => {
                        console.log(res);
                        props.onDataValueAdd(res.data.patientData);
                        resetForm();
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
                        <ErrorMessageStyled name="dataValue" component="div" />
                    </FormGroup>
                    <FormGroup>
                        <LabelStyled htmlFor="dateValue">Data (DD-MM-YYYY HH:mm)</LabelStyled>
                        <FieldStyled name="dateValue" placeholder="Data..." id="dateValue" />
                        <ErrorMessageStyled name="dateValue" component="div" />
                    </FormGroup>
                    <FormGroup>
                        <SubmitButton type="submit">Dodaj dane do zbioru</SubmitButton>
                    </FormGroup>
                </AddDataStyled>
            )}
        />
    );
};

export default AddData;
