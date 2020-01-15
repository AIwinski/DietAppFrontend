import React from "react";
import { NoteStyled, DateBadge, Content, DeleteButton } from "./Note.styled";
import { Patient } from "../../../api";

type Props = {
    createdAt: any;
    content: string;
    onNoteDelete: (id: string) => void;
    id: string;
};

const Note = (props: Props) => {
    const onDelete = (id: string) => {
        Patient.deleteNote(id)
            .then(res => {
                props.onNoteDelete(id);
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <NoteStyled>
            <DateBadge>{props.createdAt}</DateBadge>
            <Content>{props.content}</Content>
            <DeleteButton onClick={() => onDelete(props.id)}>X</DeleteButton>
        </NoteStyled>
    );
};

export default Note;
