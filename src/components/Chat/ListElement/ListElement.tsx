import React from "react";
import { ListElementStyled } from "./ListElement.styled";

type Props = {
    children: JSX.Element[] | JSX.Element | string;
    isActive: boolean;
    onClick: () => any;
};

const ListElement = (props: Props) => {
    return (
        <ListElementStyled onClick={props.onClick} isActive={props.isActive}>
            {props.children}
        </ListElementStyled>
    );
};

export default ListElement;
