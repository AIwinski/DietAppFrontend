import React from "react";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import { CardStyled, CardImageWrapper, CardContent, CardContentLeft, CardContentRight, CardDescription, CardCity, PremiumTag, CardName } from "./Card.styled";
import Avatar from "../Avatar/Avatar";
import { LinkStyled } from "../Navbar/Navbar.styled";

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
                    <Avatar isFull={true} url={image}></Avatar>
                </CardImageWrapper>
            </Link>
            <CardContent>
                <CardContentLeft>
                    <CardName>
                        <LinkStyled to={profileURL}>{name}</LinkStyled>
                    </CardName>
                    {isPremium && <PremiumTag>&#10004;</PremiumTag>}
                    <CardCity>{city}</CardCity>
                    <CardDescription>{description}</CardDescription>
                </CardContentLeft>
                <CardContentRight>
                    <Rating rating={totalRating} numberOfRatings={numberOfRatings} />
                    <LinkStyled to={profileURL}>Zobacz wiecej</LinkStyled>
                </CardContentRight>
            </CardContent>
        </CardStyled>
    );
};

export default Card;
