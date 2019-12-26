import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import Rating from "../../components/Rating/Rating";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { RouteComponentProps } from "react-router";
import { Profile as ProfileApi } from "../../api";
import {
    ProfileStyled,
    AlertStyled,
    ContactButton,
    MainWrapper,
    GeneralInfo,
    AvatarImage,
    MainRating,
    Name,
    City,
    ProfileSection,
    ElementMissingInfo,
    Info
} from "./Profile.styled";
import { Link } from "react-router-dom";
import { ApplicationState } from "../../store";
import { MIN_COMPLETION_RATE, STATIC_FILES_ROOT } from "../../constants/config";
import { connect } from "react-redux";
import PriceList from "../../components/PriceList/PriceList/PriceList";
import BarLoader from "../../components/BarLoader/BarLoader";
import Avatar from "../../components/Avatar/Avatar";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import Gallery from "../../components/Gallery/Gallery/Gallery";

interface MatchParams {
    id: string;
}

type Props = RouteComponentProps<MatchParams> & ReturnType<typeof mapStateToProps> & {};

const Profile = (props: Props) => {
    const id = props.match.params.id;
    useDocumentTitle("Profile " + id);

    const [profile, setProfile] = useState();
    const [totalRating, setTotalRating] = useState(0);
    const [numberOfReviews, setNumberOfReviews] = useState(0);

    useEffect(() => {
        ProfileApi.getProfile(id)
            .then(res => {
                console.log(res.data.profile);
                setProfile(res.data.profile);
                setRatingData(res.data.profile.totalRating, res.data.profile.ratings.length);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const setRatingData = (r: number, n: number) => {
        setTotalRating(r);
        setNumberOfReviews(n);
    };

    return (
        <ProfileStyled>
            <ContainerFluid>
                {props.currentUser.profileId == id && profile && profile.accountCompletionRate < MIN_COMPLETION_RATE && (
                    <AlertStyled>
                        Twój profil nie jest w pełni wypełniony przez co nie bedzie widoczny na liście profili. &nbsp;Uzupełnij go
                        tutaj:
                        <Link to="/profile-settings">Edit profile</Link>
                    </AlertStyled>
                )}
                {profile ? (
                    <React.Fragment>
                        <ContactButton>
                            <Link to={{ pathname: "/chat", state: { newConversationUserId: profile.ownerId } }}>Contact me</Link>
                        </ContactButton>
                        <React.Fragment>
                            <ProfileSection>
                                <MainWrapper>
                                    <AvatarImage>
                                        <Avatar
                                            isFull={true}
                                            url={profile.avatar ? props.currentUser.avatar : undefined}
                                        ></Avatar>
                                    </AvatarImage>
                                    <GeneralInfo>
                                        <Name>{profile.owner.displayName}</Name>
                                        <City>{profile.city}</City>
                                    </GeneralInfo>
                                    <MainRating>
                                        <Rating rating={totalRating} numberOfRatings={numberOfReviews} />
                                    </MainRating>
                                </MainWrapper>
                            </ProfileSection>
                            <ProfileSection>
                                {profile.images.length > 0 ? (
                                    <React.Fragment>
                                        <Info>Galeria</Info>
                                        <Gallery
                                            isEditable={false}
                                            onImageDelete={() => undefined}
                                            images={profile.images.map((i: any) => STATIC_FILES_ROOT + i.srcPath)}
                                        />
                                    </React.Fragment>
                                ) : (
                                    <ElementMissingInfo>Ten profil nie ma jeszcze galerii</ElementMissingInfo>
                                )}
                            </ProfileSection>
                            <ProfileSection>
                                {profile.priceListElements.length > 0 ? (
                                    <React.Fragment>
                                        <Info>Cennik</Info>
                                        <PriceList priceList={profile.priceListElements} />
                                    </React.Fragment>
                                ) : (
                                    <ElementMissingInfo>Ten profil nie ma jeszcze cennika</ElementMissingInfo>
                                )}
                            </ProfileSection>
                            <ProfileSection>
                                <ReviewForm
                                    profile={profile}
                                    setRatingData={setRatingData}
                                    isAuthenticated={props.isAuthenticated}
                                ></ReviewForm>
                            </ProfileSection>
                        </React.Fragment>
                    </React.Fragment>
                ) : (
                    <BarLoader></BarLoader>
                )}
            </ContainerFluid>
        </ProfileStyled>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return { currentUser: state.auth.currentUser, isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps, null)(Profile);