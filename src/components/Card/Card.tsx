import React from "react";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import { CardStyled, CardImageWrapper, CardContent, CardContentLeft, CardContentRight, CardDescription, CardCity, PremiumTag, CardName } from "./Card.styled";

type Props = {
    name: string;
    image: string;
    city: string;
    isPremium: boolean;
    description: string;
    numberOfRatings: number;
    id: string;
    totalRating: number;
};

const Card = (props: Props) => {
    const { name, image, city, isPremium, description, numberOfRatings, id, totalRating } = props;
    const profileURL = "/profile/" + id;
    return (
        <CardStyled isPremium={isPremium}>
            <Link to={profileURL}>
                <CardImageWrapper>
                    <img src={image} />
                </CardImageWrapper>
            </Link>
            <CardContent>
                <CardContentLeft>
                    <CardName>
                        <Link to={profileURL}>{name}</Link>
                    </CardName>
                    {isPremium && <PremiumTag>&#10004;</PremiumTag>}
                    <CardCity>{city}</CardCity>
                    <CardDescription>{description}</CardDescription>
                </CardContentLeft>
                <CardContentRight>
                    <Rating rating={totalRating} numberOfRatings={numberOfRatings} />
                    <Link to={profileURL}>Zobacz wiecej</Link>
                </CardContentRight>
            </CardContent>
        </CardStyled>
    );
};

export default Card;
