import React from "react";
import { ListStyled } from "./List.styled";
import ListElement from "../ListElement/ListElement";
import { ListInfo } from "./List.styled";
import Loader from "../../Loader/Loader";

type Props = {
    elements:
        | {
              id: string;
              value: string;
          }[]
        | undefined;
    onElementClick: (id: string) => any;
    active: number;
};

const List = (props: Props) => {
    const { elements, onElementClick } = props;
    return (
        <ListStyled>
            {elements ? (
                elements.length === 0 ? (
                    <ListInfo>Nie masz jeszcze zadnych konwersacji</ListInfo>
                ) : (
                    elements.map((e, index) => (
                        <ListElement isActive={String(index) !== String(props.active)} key={index} onClick={() => onElementClick(e.id)}>
                            {e.value}
                        </ListElement>
                    ))
                )
            ) : (
                <Loader />
            )}
        </ListStyled>
    );
};

export default List;
