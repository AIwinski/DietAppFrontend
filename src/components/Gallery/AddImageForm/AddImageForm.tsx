import React from "react";
import { AddImageInput, AddImageSubmitButton } from "./AddImageForm.styled";
import { Formik, Form as FormikForm } from "formik";
import { Profile as ProfileApi, AddImageProps } from "../../../api";
import { file } from "@babel/types";
import Thumbnail from "../Thumbnail/Thumbnail";

type Props = {
    profileId: string;
    onImageAdd: (data: any) => any;
    type: string;
};

const AddImageForm = (props: Props) => {
    return (
        <Formik
            initialValues={{ file: null }}
            onSubmit={(values, { resetForm }) => {
                if (values.file == null) {
                    return;
                }

                const data: AddImageProps = {
                    file: values.file,
                    profileId: props.profileId
                };

                console.log(data);
                if(props.type === 'image') {
                    ProfileApi.addImage(data)
                    .then(res => {
                        console.log(res);
                        props.onImageAdd(res.data);

                        resetForm();
                    })
                    .catch(err => {
                        console.log(err);
                    });
                } else {
                    ProfileApi.uploadAvatar(data)
                    .then(res => {
                        console.log(res);
                        props.onImageAdd(res.data);

                        resetForm();
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
            }}
            render={({ setFieldValue, values }) => (
                <FormikForm>
                    <AddImageInput
                        id="file"
                        name="file"
                        type="file"
                        onChange={(event: any) => {
                            setFieldValue("file", event.currentTarget.files[0]);
                        }}
                    ></AddImageInput>
                    <Thumbnail file={values.file}></Thumbnail>
                    <AddImageSubmitButton type="submit">&#8250;</AddImageSubmitButton>
                </FormikForm>
            )}
        ></Formik>
    );
};

export default AddImageForm;
