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
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { STATIC_FILES_ROOT } from "../../constants/config";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Navbar = (props: Props) => {
    const [menuOpened, setMenuOpened] = useState(false);

    return (
        <NavbarStyled>
            <ContainerFluid maxheight>
                <NavbarInner>
                    <Logo onClick={() => setMenuOpened(false)}>
                        <LinkStyled to="/">Home</LinkStyled>
                    </Logo>
                    <Hamburger onClick={() => setMenuOpened(!menuOpened)}></Hamburger>
                    <ItemList opened={menuOpened}>
                        {props.isAuthenticated ? (
                            <React.Fragment>
                                <Item onClick={() => setMenuOpened(false)}>
                                    <button
                                        onClick={() => {
                                            props.logout();
                                        }}
                                    >
                                        Logout
                                    </button>
                                </Item>
                                <Item onClick={() => setMenuOpened(false)}>
                                    <LinkStyled to="/chat">Chat</LinkStyled>
                                </Item>
                                {props.currentUser.accountType === "doctor" && (
                                    <React.Fragment>
                                        <Item onClick={() => setMenuOpened(false)}>
                                            <LinkStyled to={"/profile/" + props.currentUser.profileId}>My profile</LinkStyled>
                                        </Item>
                                        <Item onClick={() => setMenuOpened(false)}>
                                            <LinkStyled to={"/dashboard"}>Dashboard</LinkStyled>
                                        </Item>
                                    </React.Fragment>
                                )}
                                <Item>
                                    <NameBadge>{props.currentUser.displayName}</NameBadge>
                                </Item>
                                <Item>
                                    <AvatarAndDropdown>
                                        <Avatar url={props.currentUser.avatar ? props.currentUser.avatar : undefined}></Avatar>
                                        <DropdownMenu elements={[{ text: "Chat", url: "/chat" }]}>
                                            <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                                        </DropdownMenu>
                                    </AvatarAndDropdown>
                                </Item>
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
                        <Item onClick={() => setMenuOpened(false)}>
                            <LinkStyled to="/list">Profile List</LinkStyled>
                        </Item>
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
