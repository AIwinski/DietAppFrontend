import React from "react";
import { MessageStyled, MessageWrapper, FileBadge } from "./Message.styled";
import { MessageTypes, Chat as ChatApi } from "../../../api";
import { saveAs } from "file-saver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

type Props = {
    isReceived: boolean;
    type: string;
    text: string;
    date: string;
    srcPath: string;
    id: string;
    initialFileName: string;
};

const Message = (props: Props) => {
    const { isReceived, type, text, date, srcPath, id, initialFileName } = props;

    const downloadFile = (id: string) => {
        ChatApi.getFile(id, initialFileName)
            .then(res => {
                saveAs(res.data, initialFileName);
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    switch (type) {
        case MessageTypes.text:
            return (
                <MessageWrapper>
                    <MessageStyled isReceived={isReceived}>{text}</MessageStyled>
                </MessageWrapper>
            );
        case MessageTypes.file:
            return (
                <MessageWrapper>
                    <MessageStyled isReceived={isReceived} onClick={() => downloadFile(id)}>
                        {text}
                        <FileBadge>
                            <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
                            {initialFileName}
                        </FileBadge>
                    </MessageStyled>
                </MessageWrapper>
            );
        default:
            return <MessageWrapper>Unsupported message type</MessageWrapper>;
    }
};

export default Message;
