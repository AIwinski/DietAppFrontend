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
            <AddImageForm type="avatar" profileId={props.profileId} onImageAdd={props.onAvatarAdd}></AddImageForm>
            <Avatar url={props.currentAvatar ? props.currentAvatar : undefined}></Avatar>
            <ResetAvatarButton onClick={props.onAvatarReset}>reset avatar</ResetAvatarButton>

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
                    <FormInfo>Edit personal settings</FormInfo>
                    <FormGroup>
                        <LabelStyled htmlFor="displayName">Display name</LabelStyled>
                        <FieldStyled id="displayName" name="displayName" placeholder="Display name" />
                        <ErrorMessageStyled name="displayName" component="div" />
                    </FormGroup>
                    <FormGroup>
                        <SubmitButton type="submit">Update personal settings</SubmitButton>
                    </FormGroup>
                </PersonalSettingsForm>
            </Formik>
        </PersonalSettingsStyled>
    );
};

export default PersonalSettings;
