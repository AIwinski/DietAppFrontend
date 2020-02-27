import React from "react";
import { OfflineStyled, OfflineStyledInner } from "./Offline.styled";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const NotFound = () => {
    useDocumentTitle("Mój lekarz - jesteś offline");
    return (
        <OfflineStyled>
            <ContainerFluid>
                <OfflineStyledInner>
                    <p>Jesteś teraz offline!</p>
                    <p>Do działania aplikacji potrzebne jest połączenie z internetem.</p>
                    <p>Wróć do nas kiedy będziesz online!</p>
                </OfflineStyledInner>
            </ContainerFluid>
        </OfflineStyled>
    );
};

export default NotFound;
