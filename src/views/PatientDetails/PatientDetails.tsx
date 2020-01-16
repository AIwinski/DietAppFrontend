import React, { useEffect, useState } from "react";
import {
    PatientDetailsStyled,
    PatientDetailsStyledInner,
    PageTitle,
    PatientInfoInner,
    PatientInfo,
    Age,
    Gender,
    ImageWrapper,
    InfoBadge,
    UserExistInfo,
    UserDoesNotExistInfo,
    DataSetsContainer,
    DataSetWrapper,
    DataSetTableWrapper,
    DataSetChartWrapper,
    DataSetFormWrapper,
    DataSetInner
} from "./PatientDetails.styled";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import { Patient } from "../../api";
import { RouteComponentProps } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import { Name } from "../Profile/Profile.styled";
import Loader from "../../components/Loader/Loader";
import AddDataSet from "../../components/PatientData/AddDataSet/AddDataSet";
import AddData from "../../components/PatientData/AddData/AddData";

interface MatchParams {
    id: string;
}

type Props = RouteComponentProps<MatchParams> & {};

const PatientDetails = (props: Props) => {
    const [isPatientFetching, setPatientFetching] = useState(true);
    const [patient, setPatient] = useState();

    const [isDataSetsFetching, setDataSetsFetching] = useState(true);
    const [dataSets, setDataSets] = useState();

    useEffect(() => {
        Patient.getPatient(props.match.params.id)
            .then(res => {
                console.log(res);
                setPatient(res.data.patient);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setPatientFetching(false);
            });

        Patient.getDataSets(props.match.params.id)
            .then(res => {
                console.log(res);
                setDataSets(res.data.dataSets);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setDataSetsFetching(false);
            });
    }, []);

    const onDataSetAdd = (data: any) => {
        setDataSets([...dataSets, data]);
    };

    const onDataValueAdd = (dataSetId: string, data: any) => {
        
    };

    return (
        <PatientDetailsStyled>
            <ContainerFluid>
                <PatientDetailsStyledInner>
                    <PageTitle>Szczegóły pacjenta</PageTitle>

                    {!isPatientFetching && patient ? (
                        <React.Fragment>
                            <InfoBadge>
                                {patient.userAccount ? (
                                    <UserExistInfo>User istnieje</UserExistInfo>
                                ) : (
                                    <UserDoesNotExistInfo>User does not</UserDoesNotExistInfo>
                                )}
                            </InfoBadge>
                            <PatientInfo>
                                <ImageWrapper>
                                    <Avatar isFull={true}></Avatar>
                                </ImageWrapper>
                                <PatientInfoInner>
                                    <Name>{patient.firstName + " " + patient.lastName}</Name>
                                    <Age>{patient.age}</Age>
                                    <Gender>{patient.gender}</Gender>
                                </PatientInfoInner>
                            </PatientInfo>
                        </React.Fragment>
                    ) : (
                        <Loader></Loader>
                    )}
                    <DataSetsContainer>
                        <AddDataSet patientId={props.match.params.id} onDataSetAdd={onDataSetAdd}></AddDataSet>
                        {!isDataSetsFetching ? (
                            dataSets.map((dataSet: any, key: any) => {
                                return (
                                    <DataSetWrapper key={key}>
                                        <DataSetInner>
                                            <DataSetTableWrapper>
                                                {dataSet.dataValues.map((dv: any) => {
                                                    return <div>{dv.dataValue + " " + dv.dateValue}</div>;
                                                })}
                                            </DataSetTableWrapper>
                                            <DataSetChartWrapper>chart</DataSetChartWrapper>
                                        </DataSetInner>
                                        <DataSetFormWrapper>
                                            <AddData
                                                dataSetId={dataSet.dataSet.id}
                                                onDataValueAdd={(data: any) => onDataValueAdd(dataSet.dataSet.id, data)}
                                            ></AddData>
                                        </DataSetFormWrapper>
                                    </DataSetWrapper>
                                );
                            })
                        ) : (
                            <Loader></Loader>
                        )}
                    </DataSetsContainer>
                </PatientDetailsStyledInner>
            </ContainerFluid>
        </PatientDetailsStyled>
    );
};

export default PatientDetails;
