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
    PopularProfilesCardCity,
    LogSection
} from "./Home.styled";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import { ApplicationState } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faSearch, faChartBar, faVideo, faMedal } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/Loader/Loader";
import Avatar from "../../components/Avatar/Avatar";
import { LinkStyled, LogoImage } from "../../components/Navbar/Navbar.styled";
import Rating from "../../components/Rating/Rating";
import Footer from "../../components/Footer/Footer";

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
                        <HomeTitle>Aplikacja <LogoImage isBig={true} src="/logo.svg" ></LogoImage></HomeTitle>
                        <HomeText>Wyszukaj pośród {count} profili lekarzy!</HomeText>

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
                            Znajdz najlepszego lekarza w swojej okolicy!
                        </InfoCardText>
                    </InfoCard>
                    <InfoCard>
                        <InfoCardIcon>
                            <FontAwesomeIcon icon={faChartBar}></FontAwesomeIcon>
                        </InfoCardIcon>
                        <InfoCardText>
                            Idealne narzędzie do zarządzania danymi pacjentów przez lekarzy!
                        </InfoCardText>
                    </InfoCard>
                    <InfoCard>
                        <InfoCardIcon>
                            <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
                        </InfoCardIcon>
                        <InfoCardText>
                            Przeprowadzaj wizyty online i wymieniaj dane z pacjentami!
                        </InfoCardText>
                    </InfoCard>
                    <InfoCard>
                        <InfoCardIcon>
                            <FontAwesomeIcon icon={faMedal}></FontAwesomeIcon>
                        </InfoCardIcon>
                        <InfoCardText>
                            Rozwijaj swoją markę w oparciu o opinie klientów!
                        </InfoCardText>
                    </InfoCard>
                </InfoSection>

                {props.isAuthenticated ? null : (
                    <LogSection>
                        <LinkStyled to="/register">Nie masz jeszcze konta? Załóż je teraz!</LinkStyled>
                        <br />
                        <LinkStyled to="/login">Masz już konto? Zaloguj się!</LinkStyled>
                    </LogSection>
                )}

                <PopularProfiles>
                    <SectionTitle>Ostatnio dodane profile</SectionTitle>
                    {mostRecent !== undefined ? (
                        <PopularProfilesInner>
                            {mostRecent.map((mr: any, index: any) => {
                                return (
                                    <PopularProfilesCard key={index}>
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
            </ContainerFluid>
            <Footer></Footer>
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
