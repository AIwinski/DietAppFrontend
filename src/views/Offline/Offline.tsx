import React from "react";
import { OfflineStyled, OfflineStyledInner } from "./Offline.styled";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";

const NotFound = () => {
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
