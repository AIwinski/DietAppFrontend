import React from "react";
import { NoteStyled, DateBadge, Content, DeleteButton, Container } from "./Note.styled";
import { Patient } from "../../../api";
import moment from "moment";

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
            <Container>
                <DateBadge>{moment.utc(props.createdAt).local().format("DD-MM-YYYY HH:mm")}</DateBadge>
                <DeleteButton onClick={() => onDelete(props.id)}>x</DeleteButton>
            </Container>

            <Content>{props.content}</Content>
        </NoteStyled>
    );
};

export default Note;
