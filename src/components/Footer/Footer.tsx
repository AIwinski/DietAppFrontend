import React from "react";
import { FooterStyled, FooterStyledInner } from "./Footer.styled";
import { ContainerFluid } from "../SharedStyledComponents/ContainerFluid.styled";

const Footer = () => {
    return (
        <FooterStyled>
            <ContainerFluid>
                <FooterStyledInner>
                    <div>Praca inżynierska Artur Iwiński</div>
                    <div>PŁ 2020</div>
                </FooterStyledInner>
            </ContainerFluid>
        </FooterStyled>
    );
};

export default Footer;