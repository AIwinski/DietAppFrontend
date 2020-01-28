import React from "react";
import { PersonalSettingsStyled, CurrentAvatar, PersonalSettingsForm, ResetAvatarButton } from "./PersonalSettings.styled";
import AddImageForm from "../Gallery/AddImageForm/AddImageForm";
import * as Yup from "yup";
import {
    FormInfo,
    FormGroup,
    LabelStyled,
    SubmitButton,
    FieldStyled,
    ErrorMessageStyled
} from "../../components/SharedStyledComponents/Form.styled";
import { Formik } from "formik";
import { Profile as ProfileApi } from "../../api";
import Avatar from "../Avatar/Avatar";
import { STATIC_FILES_ROOT } from "../../constants/config";

const personalSettingsFormValidationSchema = Yup.object().shape({
    displayName: Yup.string()
        .required("Element name is required")
        .min(4, "Minimum length is 4 characters")
});

type Props = {
    profileId: string;
    onAvatarAdd: (data: any) => any;
    onAvatarReset: (data: any) => any;
    onProfileUpdate: (data: any) => any;
    profile: any;
    currentAvatar: string;
    currentDisplayName: string;
};

const PersonalSettings = (props: Props) => {
    return (
        <PersonalSettingsStyled>
            <FormGroup>
                <AddImageForm type="avatar" profileId={props.profileId} onImageAdd={props.onAvatarAdd}></AddImageForm>
            </FormGroup>
            <FormGroup>
                Avatar
                <CurrentAvatar>
                    <Avatar isFull={true} url={props.currentAvatar ? props.currentAvatar : undefined}></Avatar>
                </CurrentAvatar>
            </FormGroup>
            <FormGroup>
                <SubmitButton onClick={props.onAvatarReset}>Resetuj avatar</SubmitButton>
            </FormGroup>

            <Formik
                initialValues={{ displayName: props.currentDisplayName }}
                validationSchema={personalSettingsFormValidationSchema}
                onSubmit={values => {
                    ProfileApi.updateUserData(values)
                        .then(res => {
                            props.onProfileUpdate(res);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }}
            >
                <PersonalSettingsForm>
                    <FormInfo>Edytuj dane konta</FormInfo>
                    <FormGroup>
                        <LabelStyled htmlFor="displayName">Nick</LabelStyled>
                        <FieldStyled id="displayName" name="displayName" placeholder="Nick" />
                        <ErrorMessageStyled name="displayName" component="div" />
                    </FormGroup>
                    <FormGroup>
                        <SubmitButton type="submit">Aktualizuj</SubmitButton>
                    </FormGroup>
                </PersonalSettingsForm>
            </Formik>
        </PersonalSettingsStyled>
    );
};

export default PersonalSettings;
