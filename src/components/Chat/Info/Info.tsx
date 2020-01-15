import React from "react";
import { InfoStyled, InfoWrapper, Name, NoInfo, Email, AccountType } from "./Info.styled";
import Avatar from "../../Avatar/Avatar";
import { LinkStyled } from "../../Navbar/Navbar.styled";
import PatientButton from "../../PatientButton/PatientButton";

type Props = {
    info:
        | {
              displayName: string;
              avatar: string;
              accountType: string;
              email: string;
              userId: string;
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
                    {info.userId}
                    <LinkStyled to={"/video/" + info.userId}>video chat</LinkStyled>
                    {info.accountType === "patient" && <PatientButton userAccountId={info.userId}></PatientButton>}
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
