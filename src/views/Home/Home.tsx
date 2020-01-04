import React, { Component } from "react";
import DebouncedSearchInput from "../../components/DebouncedSearchInput/DebouncedSearchInput";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Profile } from "../../api";
import { push } from "connected-react-router";
import { HomePageStyled, HomeInner, LoggedInBadge, HomeTitle, HomeText } from "./Home.styled";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import { ApplicationState } from "../../store";

type Props = {} & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Home = (props: Props) => {
    return (
        <HomePageStyled>
            <ContainerFluid>
                <HomeInner>
                    <HomeTitle>Witaj w aplikacji</HomeTitle>
                    <HomeText>Znajdź dietetyka gregerg</HomeText>
                    <DebouncedSearchInput
                        name="search"
                        placeholder="Wyszukaj ogłoszenie trenera"
                        callback={id => {
                            console.log(id);
                            if (id) {
                                props.push("/profile/" + id);
                            }
                        }}
                        delay={500}
                        dataSource={Profile.search}
                    />
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
                </HomeInner>
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
