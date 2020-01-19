import React, { useEffect, useState } from "react";
import {
    DashboardStyled,
    DashboardStyledInner,
    NotesList,
    PatientList,
    PatientCard,
    NotesAndPatientsContainer,
    Container,
    AddPatientButton
} from "./Dashboard.styled";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Profile, Patient } from "../../api";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import Loader from "../../components/Loader/Loader";
import NoteForm from "../../components/Notes/NoteForm/NoteForm";
import Note from "../../components/Notes/Note/Note";
import { LinkStyled } from "../../components/Navbar/Navbar.styled";
import moment from "moment";
import { SectionTitle } from "../Home/Home.styled";
import Footer from "../../components/Footer/Footer";

type Props = ReturnType<typeof mapStateToProps>;

const Dashboard = (props: Props) => {
    const [report, setReport] = useState([] as any[]);
    const [notes, setNotes] = useState([] as any[]);
    const [isNotesFetching, setNotesFetching] = useState(true);
    const [isPatientsFetching, setPatientsFetching] = useState(true);
    const [patients, setPatients] = useState([] as any[]);

    useEffect(() => {
        Profile.getReport(30, props.profileId)
            .then(res => {
                console.log(res);
                const result = res.data.report.map((r: any) => {
                    return {
                        ...r,
                        day: moment
                            .utc(r.day)
                            .local()
                            .format("DD-MM-YYYY")
                    };
                });
                setReport(result);
            })
            .catch(err => {
                console.log(err);
            });

        Patient.getNotes()
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

        Patient.getPatients()
            .then(res => {
                setPatients(res.data.patients);
            })
            .catch(err => {
                setNotesFetching(false);
                console.log(err);
            })
            .finally(() => {
                setPatientsFetching(false);
            });
    }, []);

    const onNoteAdd = (note: any) => {
        setNotes([...notes, note]);
    };

    const onNoteDelete = (id: string) => {
        setNotes(notes.filter(e => e.id !== id));
    };

    return (
        <DashboardStyled>
            <ContainerFluid>
                <DashboardStyledInner>
                    <Container>
                        <SectionTitle>Liczba wejść na profil w ciągu ostatnich 30 dni</SectionTitle>
                        {report.length ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={report.reverse()} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                                    <Line type="monotone" dataKey="summary" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <Loader></Loader>
                        )}
                    </Container>
                    <NotesAndPatientsContainer>
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
                            <NoteForm onNoteAdd={onNoteAdd}></NoteForm>
                        </Container>
                        <Container>
                            <SectionTitle>Moi pacjenci</SectionTitle>
                            {!isPatientsFetching ? (
                                <PatientList>
                                    {patients.map((p, index) => {
                                        return (
                                            <PatientCard>
                                                <LinkStyled to={"/patient-details/" + p.id}>
                                                    {p.firstName + " " + p.lastName}
                                                </LinkStyled>
                                            </PatientCard>
                                        );
                                    })}
                                    <AddPatientButton to="/add-patient">Dodaj nowego pacjenta</AddPatientButton>
                                </PatientList>
                            ) : (
                                <Loader></Loader>
                            )}
                        </Container>
                    </NotesAndPatientsContainer>
                </DashboardStyledInner>
            </ContainerFluid>
            <Footer></Footer>
        </DashboardStyled>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        profileId: state.auth.currentUser.profileId
    };
};

export default connect(mapStateToProps, null)(Dashboard);
