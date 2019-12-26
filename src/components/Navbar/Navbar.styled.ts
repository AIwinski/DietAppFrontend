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

export const NavbarInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    box-sizing: border-box;
`;

export const Logo = styled.div`
    padding: 0 ${GUTTER(3)};
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0;
`;

export const Hamburger = styled.button`
    display: none;
    width: 2rem;
    height: 2rem;
    border: 1px solid red;
    background: none;
    @media (max-width: ${BREAKPOINTS.md}) {
        display: block;
    }
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
        height: calc(100vh - ${NAV_HEIGHT});
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
    position: relative;

    :link {
        color: ${COLORS.darkblue};
    }

    &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0%;
        height: 3px;
        background: ${COLORS.blue};
        z-index: 10000;
        transition: width 0.1s;
    }

    &:hover::before {
        width: 100%;
    }
`

export const NameBadge = styled.span`
    color: #444;
`

export const AvatarAndDropdown = styled.div`
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: 1fr 1fr;
`
