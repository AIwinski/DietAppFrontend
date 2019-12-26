import React from "react";
import { ChatSubmitButton, ChatTextArea, AddFile } from "./Form.styled";
import { Formik, Form as FormikForm } from "formik";
import { SendMessageProps, MessageTypes } from "../../../api";
import { Chat as ChatApi } from "../../../api";

type Props = {
    newConversation: boolean;
    newConversationUserId: string;
    coversationId: string;
    onMessageSent: (data: any) => any;
}

const Form = (props: Props) => {
    return (
        <Formik
            initialValues={{ text: "", file: null }}
            onSubmit={values => {
                if (!values.text.replace(/\s/g, "").length && values.file == null) {
                    return;
                }
                let data: SendMessageProps;

                if (values.file == null) {
                    data = {
                        conversationId: props.coversationId,
                        text: values.text,
                        file: null,
                        messageType: MessageTypes.text,
                        newConversation: props.newConversation,
                        newConversationUserId: props.newConversationUserId,
                    };
                } else {
                    data = {
                        conversationId: props.coversationId,
                        text: values.text,
                        file: values.file,
                        messageType: MessageTypes.file,
                        newConversation: props.newConversation,
                        newConversationUserId: props.newConversationUserId,
                    };
                }

                console.log(data);
                ChatApi.sendMessage(data)
                    .then(res => {
                        console.log(res);
                        props.onMessageSent(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }}
            render={({ setFieldValue }) => (
                <FormikForm>
                    <ChatTextArea name="text" placeholder="Message content" component="textarea" />
                    <AddFile
                        id="file"
                        name="file"
                        type="file"
                        onChange={(event: any) => {
                            setFieldValue("file", event.currentTarget.files[0]);
                        }}
                    ></AddFile>
                    <ChatSubmitButton type="submit">&#8250;</ChatSubmitButton>
                </FormikForm>
            )}
        ></Formik>
    );
};

export default Form;
