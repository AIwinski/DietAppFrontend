import React from "react";
import { InfoStyled, InfoWrapper, Name, NoInfo, Email, AccountType, Container } from "./Info.styled";
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
                    <Container>
                        <Avatar url={info.avatar}></Avatar>
                        <Name>{info.displayName}</Name>
                    </Container>
                    <Email>Email: {info.email}</Email>
                    <AccountType>Typ konta: {info.accountType === "doctor" ? "lekarz" : "pacjent"}</AccountType>
                    <LinkStyled to={"/video/" + info.userId}>Chat video</LinkStyled>
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
