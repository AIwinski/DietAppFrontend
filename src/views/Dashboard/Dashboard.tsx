import React from "react";
import { DashboardStyled, DashboardStyledInner } from "./Dashboard.styled";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";

type Props = {};

const Dashboard = (props: Props) => {
    return (
        <DashboardStyled>
            <ContainerFluid>
                <DashboardStyledInner>Dashboard</DashboardStyledInner>
            </ContainerFluid>
        </DashboardStyled>
    );
};

export default Dashboard;
