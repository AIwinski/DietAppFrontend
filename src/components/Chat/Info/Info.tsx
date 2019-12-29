import React from "react";
import { InfoStyled, InfoWrapper, Name, NoInfo, Email, AccountType } from "./Info.styled";
import Loader from "../../Loader/Loader";
import Avatar from "../../Avatar/Avatar";

type Props = {
    info:
        | {
              displayName: string;
              avatar: string;
              accountType: string;
              email: string;
          }
        | undefined;
};

const Info = (props: Props) => {
    const { info } = props;
    return (
        <InfoStyled>
            {info ? (
                <InfoWrapper>
                    <Avatar url={info.avatar}></Avatar>
                    <Name>{info.displayName}</Name>
                    <Email>{info.email}</Email>
                    <AccountType>{info.accountType}</AccountType>
                </InfoWrapper>
            ) : (
                <InfoWrapper>
                    <NoInfo>no info</NoInfo>
                </InfoWrapper>
            )}
        </InfoStyled>
    );
};

export default Info;
