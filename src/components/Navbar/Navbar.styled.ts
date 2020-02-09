import styled from "styled-components";
import { BREAKPOINTS, GUTTER, NAV_HEIGHT, COLORS } from "../../styles/variables";
import { Link } from "react-router-dom";

export const NavbarStyled = styled.nav`
    position: sticky;
    box-sizing: border-box;
    top: 0;
    z-index: 1000;
    height: ${NAV_HEIGHT};
    width: 100%;
    -webkit-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);

    font-weight: bold;
`;

type NavbarInnerProps = {
    isOnline: boolean;
}

export const NavbarInner = styled.div<NavbarInnerProps>`
    display: flex;
    justify-content: ${props => (props.isOnline ? "space-between" : "center")};
    /* justify-content: space-between; */
    align-items: center;
    height: 100%;
    box-sizing: border-box;
`;

export const OfflineBadge = styled.div`
    position: absolute;
    background: #ff2020;
    opacity: 0.92;
    height: 2rem;
    font-size: 1.2rem;
    bottom: -2rem;
    width: 100%;
    display: flex;
    align-items: center;
    letter-spacing: 0.1rem;
    justify-content: center;
    color: white;
    z-index: 0;
`

export const Logo = styled.div`
    padding: 0 ${GUTTER(3)};
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0;
    position: relative;
    height: 100%;
`;

export const Hamburger = styled.button`
    display: none;
    background: none;
    @media (max-width: ${BREAKPOINTS.md}) {
        display: block;
    }
    width: 2.6rem;
    height: 2.6rem;
    cursor: pointer;
    padding: 0;
    margin: 0;
    border: none;
    background: ${COLORS.white};
    color: ${COLORS.blue};
    font-size: 2.2rem;
    outline: none;
`;

type ItemListProps = {
    opened: boolean;
}

export const ItemList = styled.ul<ItemListProps>`
    display: flex;
    flex-direction: row;
    @media (max-width: ${BREAKPOINTS.md}) {
        width: 100%;
        left: 0;
        top: ${NAV_HEIGHT};
        max-height: calc(100vh - ${NAV_HEIGHT});
        position: absolute;
        flex-direction: column;
        justify-content: space-evenly;
        background: white;
        display: ${props => (props.opened ? "flex" : "none")};
    }
`;

export const Item = styled.li`
    padding: 0 ${GUTTER(4)};
    font-size: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    

    :last-of-type {
        padding-right: 0;
    }
    @media (max-width: ${BREAKPOINTS.md}) {
        justify-content: flex-start;
        padding: ${GUTTER(4)};
        border-top: 1px solid ${COLORS.gray};
        :last-of-type {
            padding-right: ${GUTTER(4)};
            border-bottom: 1px solid ${COLORS.gray};
        }
    }
`;

export const LinkStyled = styled(Link)`
    text-decoration: none;
    color: ${COLORS.darkblue};
    transition: color 0.1s;

    :link {
        color: ${COLORS.darkblue};
    }

    &:hover {
        color: ${COLORS.blue2};
    }

    position: relative;
    display: flex;
    align-items: center;
`

export const NameBadge = styled.span`
    color: #444;
    padding: 0 0.5rem;
`

export const AvatarAndDropdown = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

type LogoImageProps = {
    isBig?: boolean;
}

export const LogoImage = styled.img<LogoImageProps>`
    height: ${props => (props.isBig ? "5rem" : "3.2rem")};
    margin-left: ${props => (props.isBig ? "2rem" : "0rem")};
`