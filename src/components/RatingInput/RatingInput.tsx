import React, { useState } from "react";
import { Star, RatingValue, RatingStyled } from "../Rating/Rating.styled";

type Props = {
    cb: (data: any) => any;
    minValue: number;
    maxValue: number;
};

const RatingInput = (props: Props) => {
    const [value, setValue] = useState(props.maxValue);
    const [visibleValue, setVisibleValue] = useState(props.maxValue);

    let stars = [];
    for (let i = props.minValue; i < props.maxValue + 1; i++) {
        stars.push(
            <Star
                key={i}
                active={visibleValue >= i}
                onClick={() => {
                    setValue(i);
                    props.cb(i);
                }}
                onMouseEnter={() => setVisibleValue(i)}
                onMouseLeave={() => setVisibleValue(value)}
            >
                &#9733;
            </Star>
        );
    }
    return (
        <RatingStyled>
            <div style={{ cursor: "pointer" }}>
                {stars.map(s => {
                    return s;
                })}
            </div>
            <RatingValue>{value.toFixed(1)}</RatingValue>
        </RatingStyled>
    );
};

export default RatingInput;
