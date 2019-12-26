import React from "react";
import { InfoStyled, InfoWrapper, Name } from "./Info.styled";
import Loader from "../../Loader/Loader";

type Props = {
    info: {
        name: string;
    } | undefined;
};

const Info = (props: Props) => {
    const { info } = props;
    return (
        <InfoStyled>
            {info ? (
                <InfoWrapper>
                    <Name>{info.name}</Name>
                </InfoWrapper>
            ) : (
                <InfoWrapper>
                    <Name>no info</Name>
                </InfoWrapper>
            )}
        </InfoStyled>
    );
};

export default Info;
