import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import RatingInput from "../RatingInput/RatingInput";
import { Link } from "react-router-dom";
import { connect, MapStateToProps } from "react-redux";

import { Profile as ProfileApi } from "../../api";
import Rating from "../Rating/Rating";
import Loader from "../Loader/Loader";
import { ApplicationState } from "../../store";
import { FormGroup, SubmitButton, LabelStyled, FieldStyled } from "../SharedStyledComponents/Form.styled";
import {
    ReviewFormInfo,
    LoginFirstMessage,
    ReviewLeft,
    ReviewTop,
    ReviewElement,
    ReviewRight,
    ReviewDate,
    ReviewLogin,
    ReviewList
} from "./ReviewForm.styled";
import { LinkStyled } from "../Navbar/Navbar.styled";
import Avatar from "../Avatar/Avatar";
import BarLoader from "../BarLoader/BarLoader";

type Props = {
    profile: any;
    setRatingData: (rating: number, sumOfRatings: number) => any;
    isAuthenticated: boolean;
    currentUser: any;
};

const ReviewForm = (props: Props) => {
    const [reviews, setReviews] = useState(props.profile.ratings);
    const [inProgress, setInProgress] = useState(false);
    const [addedReviewId, setAddedReviewId] = useState();

    useEffect(() => {
        reviews.forEach((e: any) => {
            if (props.currentUser && e.authorId === props.currentUser.id) {
                setAddedReviewId(e.id);
            }
        });
    }, [reviews]);

    return (
        <React.Fragment>
            <ReviewList>
                {reviews || (reviews && reviews.length === 0) ? (
                    reviews.map((e: any) => {
                        let date = new Date(e.createdAt).toLocaleDateString("PL-pl");
                        console.log(e);
                        return (
                            <ReviewElement key={e.id}>
                                <ReviewTop>
                                    <ReviewLeft>
                                        <Avatar url={e.author.avatar} />
                                        <ReviewLogin>{e.author.displayName}</ReviewLogin>
                                        <ReviewDate>{date}</ReviewDate>
                                    </ReviewLeft>
                                    <ReviewRight>
                                        <Rating rating={e.ratingValue} numberOfRatings={undefined} />
                                    </ReviewRight>
                                </ReviewTop>
                                <div>{e.content}</div>
                            </ReviewElement>
                        );
                    })
                ) : (
                    <Loader />
                )}
            </ReviewList>

            {props.isAuthenticated ? (
                <React.Fragment>
                    <ReviewFormInfo>{addedReviewId ? "Edytuj" : "Dodaj"} swoją recenzję:</ReviewFormInfo>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            ratingValue: addedReviewId ? reviews.find((r: any) => r.id === addedReviewId).ratingValue : 5,
                            content: addedReviewId ? reviews.find((r: any) => r.id === addedReviewId).content : ""
                        }}
                        onSubmit={values => {
                            if (values.content.length === 0) {
                                return;
                            }
                            setInProgress(true);
                            
                            if (addedReviewId) {
                                const data = {
                                    reviewId: addedReviewId,
                                    content: values.content,
                                    ratingValue: values.ratingValue
                                };
                                ProfileApi.updateReview(data)
                                    .then(res => {
                                        console.log(res);
                                        reviews.find((r: any) => r.id === addedReviewId).ratingValue = values.ratingValue
                                        reviews.find((r: any) => r.id === addedReviewId).content = values.content
                                        let sumOfReviews = 0;
                                        reviews.forEach((element: any) => {
                                            sumOfReviews += element.ratingValue;
                                        });
                                        let avgRating = sumOfReviews / reviews.length || 0;

                                        props.setRatingData(avgRating, reviews.length);
                                        setInProgress(false);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                            } else {
                                const data = {
                                    profileId: props.profile.id,
                                    content: values.content,
                                    ratingValue: values.ratingValue
                                };
                                ProfileApi.addReview(data)
                                    .then(res => {
                                        console.log(res);
                                        setReviews([...reviews, res.data.rating]);
                                        const revs = [...reviews, res.data.rating];

                                        let numberOfRatings = revs.length;
                                        let sumOfReviews = 0;
                                        revs.forEach((element: any) => {
                                            sumOfReviews += element.ratingValue;
                                        });
                                        let avgRating = sumOfReviews / numberOfRatings || 0;

                                        props.setRatingData(avgRating, numberOfRatings);
                                        setInProgress(false);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                            }
                        }}
                        render={({ setFieldValue }) => (
                            <Form>
                                <FormGroup>
                                    <LabelStyled htmlFor="content">Twój komentarz</LabelStyled>
                                    <FieldStyled name="content" placeholder="Twój komentarz" required />
                                </FormGroup>
                                <FormGroup>
                                    <LabelStyled htmlFor="ratingValue">Twoja ocena</LabelStyled>
                                    <RatingInput cb={value => setFieldValue("ratingValue", value)} minValue={1} maxValue={5} />
                                </FormGroup>
                                <FormGroup>
                                    <SubmitButton type="submit">{addedReviewId ? "Edytuj" : "Dodaj"} swoją recenzję</SubmitButton>
                                </FormGroup>
                            </Form>
                        )}
                    />
                    {inProgress && <BarLoader></BarLoader>}
                </React.Fragment>
            ) : (
                <LoginFirstMessage>
                    Aby dodać własną recenzję należy być zalogowanym! <LinkStyled to="/login">Zaloguj się</LinkStyled>
                </LoginFirstMessage>
            )}
        </React.Fragment>
    );
};

export default ReviewForm;
