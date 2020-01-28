import React from "react";
import { PriceListElementStyled, Price, Name, DeleteButton } from "./PriceListElement.styled";

type Props = {
    elementName: string;
    price: number;
    onDelete?: (id: string) => any;
    editable: boolean;
    id: string;
};

const PriceListElement = (props: Props) => {
    return (
        <PriceListElementStyled>
            <Name>{props.elementName}</Name>
            <Price>{props.price} zł</Price>
            {props.editable && (
                <React.Fragment>
                    <DeleteButton
                        onClick={() => {
                            if (props.onDelete) {
                                props.onDelete(props.id);
                            }
                        }}
                    >
                        Usuń
                    </DeleteButton>
                </React.Fragment>
            )}
        </PriceListElementStyled>
    );
};

export default PriceListElement;
