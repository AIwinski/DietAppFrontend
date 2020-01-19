import React from "react";
import { Star, RatingNumber, RatingValue, RatingStyled } from "./Rating.styled";

export type Props = {
    numberOfRatings: number | undefined;
    rating: number;
} & typeof defaultProps;

const defaultProps = {
    minValue: 1,
    maxValue: 5
};

const Rating = (props: Props) => {
    const { rating, numberOfRatings, minValue, maxValue } = props;
    const roundedRating = Math.round(rating * 10) / 10;
    let stars = [];
    for (let i = minValue; i < maxValue + 1; i++) {
        stars.push(
            <Star key={i} active={roundedRating >= i}>
                &#9733;
            </Star>
        );
    }
    return (
        <RatingStyled>
            <RatingValue>
                {roundedRating.toFixed(1)} / {maxValue.toFixed(1)}
            </RatingValue>
            <div>
                {stars.map(s => {
                    return s;
                })}
            </div>
            {numberOfRatings && <RatingNumber>({numberOfRatings})</RatingNumber>}
        </RatingStyled>
    );
};

Rating.defaultProps = defaultProps;

export default Rating;
