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
    DataSetInner,
    Table,
    StyledTh,
    StyledTr,
    StyledTd,
    DataSetInfo,
    DataSetTitle,
    DataSetDescription,
    DataSetUnit,
    DeleteDataSet,
    TherapyGoal
} from "./PatientDetails.styled";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import { Patient } from "../../api";
import { RouteComponentProps } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import { Name, ContactButton } from "../Profile/Profile.styled";
import Loader from "../../components/Loader/Loader";
import AddDataSet from "../../components/PatientData/AddDataSet/AddDataSet";
import AddData from "../../components/PatientData/AddData/AddData";
import moment from "moment";
import { DeleteButton } from "../../components/Notes/Note/Note.styled";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";
import { SectionTitle } from "../Home/Home.styled";
import { Container } from "../Dashboard/Dashboard.styled";
import { SubmitButton } from "../../components/SharedStyledComponents/Form.styled";
import { LinkStyled } from "../../components/Navbar/Navbar.styled";

interface MatchParams {
    id: string;
}

type Props = RouteComponentProps<MatchParams> & {};

const PatientDetails = (props: Props) => {
    const [isPatientFetching, setPatientFetching] = useState(true);
    const [patient, setPatient] = useState();

    const [isDataSetsFetching, setDataSetsFetching] = useState(true);
    const [dataSets, setDataSets] = useState();

    const [addDataSetShown, setDataSetShown] = useState(false);

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
                let dataSets = res.data.dataSets;
                dataSets = dataSets.map((ds: any) => {
                    return {
                        ...ds,
                        dataValues: ds.dataValues.map((dv: any) => {
                            return {
                                ...dv,
                                dateValue: moment
                                    .utc(dv.dateValue)
                                    .local()
                                    .format("DD-MM-YYYY HH:mm")
                            };
                        })
                    };
                });
                dataSets.forEach((ds: any) => {
                    ds.dataValues.sort((a: any, b: any) => {
                        if (
                            moment(a.dateValue)
                                .toDate()
                                .getTime() <
                            moment(b.dateValue)
                                .toDate()
                                .getTime()
                        ) {
                            return -1;
                        } else {
                            return 1;
                        }
                    });
                });
                setDataSets(dataSets);
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
        setDataSetShown(false);
    };

    const onDataSetDelete = (id: string) => {
        Patient.removeDataSet(id).then(res => {
            const dsCopy: any[] = JSON.parse(JSON.stringify(dataSets));
            dsCopy.splice(
                dsCopy.findIndex(ds => ds.dataSet.id === id),
                1
            );
            setDataSets(dsCopy);
        });
    };

    const onDataValueAdd = (dataSetId: string, data: any) => {
        const dsCopy: any[] = JSON.parse(JSON.stringify(dataSets));
        data = {
            ...data,
            dateValue: moment
                .utc(data.dateValue)
                .local()
                .format("DD-MM-YYYY HH:mm")
        };
        dsCopy.find(ds => ds.dataSet.id === dataSetId).dataValues.push(data);

        dsCopy
            .find(ds => ds.dataSet.id === dataSetId)
            .dataValues.sort((a: any, b: any) => {
                if (
                    moment(a.dateValue)
                        .toDate()
                        .getTime() <
                    moment(b.dateValue)
                        .toDate()
                        .getTime()
                ) {
                    return -1;
                } else {
                    return 1;
                }
            });
        setDataSets(dsCopy);
    };

    const deleteDataValue = (id: string, dataSetId: string) => {
        Patient.deleteDataValue(id)
            .then(res => {
                const dsCopy: any[] = JSON.parse(JSON.stringify(dataSets));
                dsCopy
                    .find(ds => ds.id === dataSetId)
                    .dataValues.splice(
                        dsCopy.find(ds => ds.id === dataSetId).dataValues.findIndex((i: any) => i.id === id),
                        1
                    );
                setDataSets(dsCopy);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <PatientDetailsStyled>
            <ContainerFluid>
                <PatientDetailsStyledInner>
                    <SectionTitle>Szczegóły pacjenta</SectionTitle>

                    {!isPatientFetching && patient ? (
                        <React.Fragment>
                            <InfoBadge>
                                {patient.userAccount ? (
                                    <UserExistInfo>
                                        <div>Użytkownik jest zarejestrowany w systemie</div>
                                        <ContactButton
                                            to={{ pathname: "/chat", state: { newConversationUserId: patient.userAccount.id } }}
                                        >
                                            Chat
                                        </ContactButton>
                                    </UserExistInfo>
                                ) : (
                                    <UserDoesNotExistInfo>Ten pacjent nie jest powiązany z kontem w tej aplikacji</UserDoesNotExistInfo>
                                )}
                            </InfoBadge>
                            <PatientInfo>
                                <ImageWrapper>
                                    <Avatar isFull={true}></Avatar>
                                </ImageWrapper>
                                <PatientInfoInner>
                                    <Name>Imię i nazwisko: {patient.firstName + " " + patient.lastName}</Name>
                                    <Age>Wiek: {patient.age}</Age>
                                    <Gender>Płeć: {patient.gender}</Gender>
                                    <TherapyGoal>Cel terapii: {patient.therapyGoal}</TherapyGoal>
                                </PatientInfoInner>
                            </PatientInfo>
                        </React.Fragment>
                    ) : (
                        <Loader></Loader>
                    )}
                    <DataSetsContainer>
                        <SectionTitle>Dane pacjenta</SectionTitle>
                        {!isDataSetsFetching ? (
                            dataSets.map((dataSet: any, key: any) => {
                                return (
                                    <DataSetWrapper key={key}>
                                        <DataSetInfo>
                                            <DataSetTitle>Nazwa: {dataSet.dataSet.title}</DataSetTitle>
                                            <DataSetDescription>Opis: {dataSet.dataSet.descr}</DataSetDescription>
                                            <DataSetUnit>Jednostka: {dataSet.dataSet.unit}</DataSetUnit>
                                            <DeleteDataSet onClick={() => onDataSetDelete(dataSet.dataSet.id)}>
                                                Usuń zbiór danych
                                            </DeleteDataSet>
                                        </DataSetInfo>
                                        <DataSetInner>
                                            <DataSetTableWrapper>
                                                <Table>
                                                    <thead>
                                                        <StyledTr>
                                                            <StyledTh>Wartość</StyledTh>
                                                            <StyledTh>Data</StyledTh>
                                                            <StyledTh>Usuń wartość</StyledTh>
                                                        </StyledTr>
                                                    </thead>
                                                    <tbody>
                                                        {dataSet.dataValues.map((dv: any, index: any) => {
                                                            return (
                                                                <StyledTr key={index}>
                                                                    <StyledTd>{dv.dateValue}</StyledTd>
                                                                    <StyledTd>{dv.dataValue}</StyledTd>
                                                                    <StyledTd>
                                                                        <DeleteButton
                                                                            onClick={() =>
                                                                                deleteDataValue(dv.id, dataSet.dataSet.id)
                                                                            }
                                                                        >
                                                                            x
                                                                        </DeleteButton>
                                                                    </StyledTd>
                                                                </StyledTr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </Table>
                                                <DataSetFormWrapper>
                                                    <AddData
                                                        dataSetId={dataSet.dataSet.id}
                                                        onDataValueAdd={(data: any) => onDataValueAdd(dataSet.dataSet.id, data)}
                                                    ></AddData>
                                                </DataSetFormWrapper>
                                            </DataSetTableWrapper>
                                            <DataSetChartWrapper>
                                                <ResponsiveContainer width="100%" height={350}>
                                                    <LineChart
                                                        data={dataSet.dataValues.reverse()}
                                                        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                                                    >
                                                        <Line type="monotone" dataKey="dataValue" />
                                                        <XAxis dataKey="dateValue" />
                                                        <YAxis />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </DataSetChartWrapper>
                                        </DataSetInner>
                                    </DataSetWrapper>
                                );
                            })
                        ) : (
                            <Loader></Loader>
                        )}

                        {!addDataSetShown && (
                            <Container>
                                <SubmitButton onClick={() => setDataSetShown(true)}>
                                    Dodaj nowy zbiór danych pacjenta
                                </SubmitButton>
                            </Container>
                        )}
                        {addDataSetShown && (
                            <Container>
                                <AddDataSet patientId={props.match.params.id} onDataSetAdd={onDataSetAdd}></AddDataSet>
                            </Container>
                        )}
                    </DataSetsContainer>
                </PatientDetailsStyledInner>
            </ContainerFluid>
        </PatientDetailsStyled>
    );
};

export default PatientDetails;
