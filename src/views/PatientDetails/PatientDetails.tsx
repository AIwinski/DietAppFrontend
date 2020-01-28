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
import { Container, NotesAndPatientsContainer, NotesList } from "../Dashboard/Dashboard.styled";
import { SubmitButton } from "../../components/SharedStyledComponents/Form.styled";
import { LinkStyled } from "../../components/Navbar/Navbar.styled";
import Note from "../../components/Notes/Note/Note";
import NoteForm from "../../components/Notes/NoteForm/NoteForm";

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

    const [notes, setNotes] = useState([] as any[]);
    const [isNotesFetching, setNotesFetching] = useState(true);

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

        Patient.getNotes(props.match.params.id)
            .then(res => {
                console.log(res);
                setNotes(res.data.notes);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setNotesFetching(false);
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
                                dateValueString: moment
                                    .utc(dv.dateValue)
                                    .local()
                                    .format("DD-MM-YYYY HH:mm")
                            };
                        })
                    };
                });
                dataSets.forEach((ds: any) => {
                    ds.dataValues.sort((a: any, b: any) => {
                        console.log(
                            moment(a.dateValue)
                                .toDate()
                                .getTime()
                        );
                        if (a.dateValue < b.dateValue) {
                            return -1;
                        } else {
                            return 1;
                        }
                    });
                    console.log(ds);
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
            dateValueString: moment
                .utc(data.dateValue)
                .local()
                .format("DD-MM-YYYY HH:mm")
        };
        dsCopy.find(ds => ds.dataSet.id === dataSetId).dataValues.push(data);
        console.log(dsCopy);

        dsCopy
            .find(ds => ds.dataSet.id === dataSetId)
            .dataValues.sort((a: any, b: any) => {
                if (a.dateValue < b.dateValue) {
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
                    .find(ds => ds.dataSet.id === dataSetId)
                    .dataValues.splice(
                        dsCopy.find(ds => ds.dataSet.id === dataSetId).dataValues.findIndex((i: any) => i.id === id),
                        1
                    );
                setDataSets(dsCopy);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const onNoteAdd = (note: any) => {
        setNotes([...notes, note]);
    };

    const onNoteDelete = (id: string) => {
        setNotes(notes.filter(e => e.id !== id));
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
                                    <UserDoesNotExistInfo>
                                        Ten pacjent nie jest powiązany z kontem w tej aplikacji
                                    </UserDoesNotExistInfo>
                                )}
                            </InfoBadge>
                            <NotesAndPatientsContainer>
                                <Container>
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
                                </Container>
                                <Container>
                                    <SectionTitle>Moje notatki</SectionTitle>
                                    {!isNotesFetching ? (
                                        <NotesList>
                                            {notes.map((note, index) => {
                                                return (
                                                    <Note
                                                        createdAt={note.createdAt}
                                                        content={note.content}
                                                        key={index}
                                                        id={note.id}
                                                        onNoteDelete={onNoteDelete}
                                                    ></Note>
                                                );
                                            })}
                                        </NotesList>
                                    ) : (
                                        <Loader></Loader>
                                    )}
                                    <NoteForm onNoteAdd={onNoteAdd} patientId={props.match.params.id}></NoteForm>
                                </Container>
                            </NotesAndPatientsContainer>
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
                                                                    <StyledTd>{dv.dateValueString}</StyledTd>
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
                                                        data={dataSet.dataValues}
                                                        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                                                    >
                                                        <Line type="monotone" dataKey="dataValue" />
                                                        <XAxis dataKey="dateValueString" />
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
