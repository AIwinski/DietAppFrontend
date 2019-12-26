import React from "react";
import { LoaderStyled, LoaderWrapper } from "./Loader.styled";

const Loader = () => {
    return (
        <LoaderWrapper>
            <LoaderStyled>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </LoaderStyled>
        </LoaderWrapper>
    );
};

export default Loader;
