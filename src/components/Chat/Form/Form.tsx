import React, { useRef } from "react";
import { ChatSubmitButton, ChatTextArea, AddFile, Bottom, AddFileLabel, Label } from "./Form.styled";
import { Formik, Form as FormikForm } from "formik";
import { SendMessageProps, MessageTypes } from "../../../api";
import { Chat as ChatApi } from "../../../api";
import { faUpload, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    newConversation: boolean;
    newConversationUserId: string;
    coversationId: string;
    onMessageSent: (data: any) => any;
};

const Form = (props: Props) => {
    const ref = useRef(null);

    const onEnterPress = (e: any) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            // @ts-ignore
            ref.current.handleSubmit();
        }
    };
    return (
        <Formik
            ref={ref}
            initialValues={{ text: "", file: null }}
            onSubmit={(values, { setFieldValue }) => {
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
                        newConversationUserId: props.newConversationUserId
                    };
                } else {
                    data = {
                        conversationId: props.coversationId,
                        text: values.text,
                        file: values.file,
                        messageType: MessageTypes.file,
                        newConversation: props.newConversation,
                        newConversationUserId: props.newConversationUserId
                    };
                }

                console.log(data);
                ChatApi.sendMessage(data)
                    .then(res => {
                        console.log(res);
                        props.onMessageSent(res.data);
                        setFieldValue("text", "");
                        setFieldValue("file", null);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }}
            render={({ setFieldValue, values }) => (
                <FormikForm>
                    <ChatTextArea name="text" placeholder="Wpisz wiadomość..." component="textarea" onKeyDown={onEnterPress} />
                    <Bottom>
                        <AddFileLabel>
                            <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>

                            <Label>
                                {/* 
                                // @ts-ignore */}
                                {values.file ? values.file.name : "Załącz plik"}
                            </Label>
                            <AddFile
                                id="file"
                                name="file"
                                type="file"
                                onChange={(event: any) => {
                                    setFieldValue("file", event.currentTarget.files[0]);
                                }}
                            ></AddFile>
                        </AddFileLabel>

                        <ChatSubmitButton type="submit"><Label>Wyślij</Label> <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></ChatSubmitButton>
                    </Bottom>
                </FormikForm>
            )}
        ></Formik>
    );
};

export default Form;
