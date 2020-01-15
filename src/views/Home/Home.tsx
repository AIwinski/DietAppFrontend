import React, { Component, useState, useEffect } from "react";
import DebouncedSearchInput from "../../components/DebouncedSearchInput/DebouncedSearchInput";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Profile } from "../../api";
import { push } from "connected-react-router";
import {
    HomePageStyled,
    HomeInner,
    LoggedInBadge,
    HomeTitle,
    HomeText,
    HomeHero,
    SearchInputWrapper,
    ScrollButton,
    InfoSection,
    InfoCard,
    InfoCardIcon,
    InfoCardText,
    PopularProfiles,
    PopularProfilesInner,
    PopularProfilesCard,
    SectionTitle,
    PopularProfilesCardName,
    PopularProfilesCardCity
} from "./Home.styled";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import { ApplicationState } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faSearch, faChartBar, faVideo, faMedal } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/Loader/Loader";
import Avatar from "../../components/Avatar/Avatar";
import { LinkStyled } from "../../components/Navbar/Navbar.styled";
import Rating from "../../components/Rating/Rating";

type Props = {} & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Home = (props: Props) => {
    const [count, setCount] = useState();
    const [mostRecent, setMostRecent] = useState();

    useEffect(() => {
        Profile.count()
            .then(res => {
                console.log(res);
                setCount(res.data.count);
            })
            .catch(err => {
                console.log(err);
            });

        Profile.mostRecent()
            .then(res => {
                console.log(res.data.result);
                setMostRecent([...res.data.result]);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <HomePageStyled>
            <ContainerFluid>
                <HomeHero>
                    <HomeInner>
                        <HomeTitle>Witaj w aplikacji</HomeTitle>

                        <HomeText>Wyszukaj pośród {count} profili dietetyków!</HomeText>

                        <SearchInputWrapper>
                            <DebouncedSearchInput
                                name="search"
                                placeholder="Wyszukaj ogłoszenie..."
                                callback={id => {
                                    console.log(id);
                                    if (id) {
                                        props.push("/profile/" + id);
                                    }
                                }}
                                delay={500}
                                dataSource={Profile.search}
                            />
                        </SearchInputWrapper>
                    </HomeInner>
                    <ScrollButton to="#info">
                        <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                    </ScrollButton>
                </HomeHero>
                <InfoSection id="info">
                    <InfoCard>
                        <InfoCardIcon>
                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                        </InfoCardIcon>
                        <InfoCardText>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, praesentium!
                        </InfoCardText>
                    </InfoCard>
                    <InfoCard>
                        <InfoCardIcon>
                            <FontAwesomeIcon icon={faChartBar}></FontAwesomeIcon>
                        </InfoCardIcon>
                        <InfoCardText>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, praesentium!
                        </InfoCardText>
                    </InfoCard>
                    <InfoCard>
                        <InfoCardIcon>
                            <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
                        </InfoCardIcon>
                        <InfoCardText>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, praesentium!
                        </InfoCardText>
                    </InfoCard>
                    <InfoCard>
                        <InfoCardIcon>
                            <FontAwesomeIcon icon={faMedal}></FontAwesomeIcon>
                        </InfoCardIcon>
                        <InfoCardText>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, praesentium!
                        </InfoCardText>
                    </InfoCard>
                </InfoSection>
                <PopularProfiles>
                    <SectionTitle>Ostatnio dodane profile</SectionTitle>
                    {mostRecent !== undefined ? (
                        <PopularProfilesInner>
                            {mostRecent.map((mr: any) => {
                                return (
                                    <PopularProfilesCard>
                                        <Avatar url={mr.owner.avatar}></Avatar>
                                        <PopularProfilesCardName>{mr.owner.displayName}</PopularProfilesCardName>
                                        <Rating rating={mr.totalRating} numberOfRatings={mr.ratings.length}></Rating>
                                        <PopularProfilesCardCity>{mr.city}</PopularProfilesCardCity>
                                        <LinkStyled to={"/profile/" + mr.id}>Zobacz profil</LinkStyled>
                                    </PopularProfilesCard>
                                );
                            })}
                        </PopularProfilesInner>
                    ) : (
                        <Loader></Loader>
                    )}
                </PopularProfiles>
                <div>
                    {props.isAuthenticated ? (
                        <LoggedInBadge>Zalogowano jako: {props.currentUser.displayName}</LoggedInBadge>
                    ) : (
                        <React.Fragment>
                            <Link to="/register" className="hero__link">
                                Nie masz jeszcze konta? Załóż je teraz!
                            </Link>
                            <br />
                            <Link to="/login" className="hero__link">
                                Masz już konto? Zaloguj się!
                            </Link>
                        </React.Fragment>
                    )}
                </div>
            </ContainerFluid>
        </HomePageStyled>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        currentUser: state.auth.currentUser,
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapDispatchToProps = {
    push
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
