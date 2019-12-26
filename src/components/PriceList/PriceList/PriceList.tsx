import React from "react";
import { PriceListStyled } from "./PriceList.styled";
import PriceListElement from "../PriceListElement/PriceListElement";

type Props = {
    priceList: any[];
};

const PriceList = (props: Props) => {
    return (
        <PriceListStyled>
            {props.priceList.map((element: any) => {
                return (
                    <PriceListElement
                        key={element.id}
                        elementName={element.elementName}
                        price={element.price}
                        editable={false}
                        id={element.id}
                    />
                );
            })}
        </PriceListStyled>
    );
};

export default PriceList;

