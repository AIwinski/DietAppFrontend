import React from "react";
import { Formik } from "formik";
import { NoteFormStyled } from "./NoteForm.styled";
import { SubmitButton, FormGroup, LabelStyled, FieldStyled } from "../../SharedStyledComponents/Form.styled";
import { Patient } from "../../../api";

type Props = {
    patientId?: string;
    onNoteAdd: (note: any) => void;
};

const NoteForm = (props: Props) => {
    return (
        <Formik
            initialValues={{
                content: ""
            }}
            onSubmit={(values, { setFieldValue }) => {
                console.log(values);
                Patient.addNote({
                    ...values,
                    patientId: props.patientId
                })
                    .then(res => {
                        console.log(res);
                        props.onNoteAdd(res.data.note);
                        setFieldValue("content", "");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }}
            render={() => (
                <NoteFormStyled>
                    <FormGroup>
                        <LabelStyled htmlFor="content">Notatka</LabelStyled>
                        <FieldStyled name="content" placeholder="Notatka..." id="content" />
                    </FormGroup>
                    <FormGroup>
                        <SubmitButton type="submit">Dodaj notatkę</SubmitButton>
                    </FormGroup>
                </NoteFormStyled>
            )}
        />
    );
};

export default NoteForm;
