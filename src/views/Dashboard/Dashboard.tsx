import React, { useEffect, useState } from "react";
import { DashboardStyled, DashboardStyledInner } from "./Dashboard.styled";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Profile } from "../../api";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import Loader from "../../components/Loader/Loader";

type Props = ReturnType<typeof mapStateToProps>;

const Dashboard = (props: Props) => {
    const [report, setReport] = useState([] as any[]);

    useEffect(() => {
        Profile.getReport(7, props.profileId)
            .then(res => {
                console.log(res);
                setReport(res.data.report);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <DashboardStyled>
            <ContainerFluid>
                <DashboardStyledInner>
                    Dashboard
                    {report.length ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={report}>
                                <Line type="monotone" dataKey="summary" />
                                <XAxis dataKey="day" />
                                <YAxis />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <Loader></Loader>
                    )}
                </DashboardStyledInner>
            </ContainerFluid>
        </DashboardStyled>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        profileId: state.auth.currentUser.profileId
    };
};

export default connect(mapStateToProps, null)(Dashboard);
