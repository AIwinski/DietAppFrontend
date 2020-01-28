import React from "react";
import { GeneralSettingsForm, TextAreaStyled } from "./GeneralSettings.styled";
import { Formik } from "formik";
import * as Yup from "yup";
import {
    FormInfo,
    FormGroup,
    LabelStyled,
    SubmitButton,
    FieldStyled,
    ErrorMessageStyled
} from "../../components/SharedStyledComponents/Form.styled";
import { Profile as ProfileApi, AddPriceListElementProps } from "../../api";

const generalSettingsFormValidationSchema = Yup.object().shape({
    city: Yup.string().required("City is required"),
    descr: Yup.string().required("Description is required")
});

type Props = {
    profileId: string;
    profile: any;
    onProfileUpdate: (data: any) => any;
};

const GeneralSettings = (props: Props) => {
    return (
        <Formik
            initialValues={{ city: props.profile.city, descr: props.profile.descr }}
            validationSchema={generalSettingsFormValidationSchema}
            onSubmit={values => {
                console.log(values)
                ProfileApi.updateProfileData(values, props.profileId)
                    .then(res => {
                        console.log(res)
                        props.onProfileUpdate(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }}
        >
            <GeneralSettingsForm>
                <FormInfo>Ogólne ustawienia profilu</FormInfo>
                <FormGroup>
                    <LabelStyled htmlFor="city">Miasto</LabelStyled>
                    <FieldStyled id="city" name="city" placeholder="Miasto" />
                    <ErrorMessageStyled name="city" component="div" />
                </FormGroup>
                <FormGroup>
                    <LabelStyled htmlFor="descr">Opis</LabelStyled>
                    <TextAreaStyled name="descr" placeholder="Opis" id="descr" component="textarea" />
                    <ErrorMessageStyled name="descr" component="div" />
                </FormGroup>
                <FormGroup>
                    <SubmitButton type="submit">Aktualizuj</SubmitButton>
                </FormGroup>
            </GeneralSettingsForm>
        </Formik>
    );
};

export default GeneralSettings;
