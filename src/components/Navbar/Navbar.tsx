import React, { useState } from "react";
import {
    NavbarStyled,
    Logo,
    Hamburger,
    ItemList,
    Item,
    NavbarInner,
    NameBadge,
    LinkStyled,
    AvatarAndDropdown
} from "./Navbar.styled";
import { ContainerFluid } from "../SharedStyledComponents/ContainerFluid.styled";
import { connect } from "react-redux";
import { logout } from "../../store/auth/actions";
import { ApplicationState } from "../../store";
import Avatar from "../Avatar/Avatar";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Navbar = (props: Props) => {
    const [menuOpened, setMenuOpened] = useState(false);

    return (
        <NavbarStyled>
            <ContainerFluid maxheight>
                <NavbarInner>
                    <Logo onClick={() => setMenuOpened(false)}>
                        <LinkStyled to="/">LOGO</LinkStyled>
                    </Logo>
                    <Hamburger onClick={() => setMenuOpened(!menuOpened)}>
                        {menuOpened ? (
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                        ) : (
                            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                        )}
                    </Hamburger>
                    <ItemList opened={menuOpened}>
                        <Item onClick={() => setMenuOpened(false)}>
                            <LinkStyled to="/list">Przeglądaj profile</LinkStyled>
                        </Item>
                        {props.isAuthenticated ? (
                            <React.Fragment>
                                <Item onClick={() => setMenuOpened(false)}>
                                    <LinkStyled to="/chat">Chat</LinkStyled>
                                </Item>
                                {props.currentUser.accountType === "doctor" ? (
                                    <React.Fragment>
                                        <Item onClick={() => setMenuOpened(false)}>
                                            <LinkStyled to={"/dashboard"}>Dashboard</LinkStyled>
                                        </Item>
                                        <Item>
                                            <AvatarAndDropdown>
                                                <Avatar
                                                    url={props.currentUser.avatar ? props.currentUser.avatar : undefined}
                                                ></Avatar>
                                                <NameBadge>{props.currentUser.displayName}</NameBadge>
                                                <DropdownMenu
                                                    elements={[
                                                        { text: "Mój profil", url: "/profile/" + props.currentUser.profileId },
                                                        { text: "Edytuj profil", url: "/profile-settings" },
                                                        {
                                                            text: "Wyloguj się",
                                                            onclick: () => {
                                                                props.logout();
                                                            }
                                                        }
                                                    ]}
                                                >
                                                    <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                                                </DropdownMenu>
                                            </AvatarAndDropdown>
                                        </Item>
                                    </React.Fragment>
                                ) : (
                                    <Item>
                                        <AvatarAndDropdown>
                                            <Avatar
                                                url={props.currentUser.avatar ? props.currentUser.avatar : undefined}
                                            ></Avatar>
                                            <NameBadge>{props.currentUser.displayName}</NameBadge>
                                            <DropdownMenu
                                                elements={[
                                                    { text: "Edytuj profil", url: "/profile-settings" },
                                                    {
                                                        text: "Wyloguj się",
                                                        onclick: () => {
                                                            props.logout();
                                                        }
                                                    }
                                                ]}
                                            >
                                                <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                                            </DropdownMenu>
                                        </AvatarAndDropdown>
                                    </Item>
                                )}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Item onClick={() => setMenuOpened(false)}>
                                    <LinkStyled to="/login">Login</LinkStyled>
                                </Item>
                                <Item onClick={() => setMenuOpened(false)}>
                                    <LinkStyled to="/register">Register</LinkStyled>
                                </Item>
                            </React.Fragment>
                        )}
                    </ItemList>
                </NavbarInner>
            </ContainerFluid>
        </NavbarStyled>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        currentUser: state.auth.currentUser,
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
