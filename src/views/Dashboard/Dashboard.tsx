import React, { useEffect, useState } from "react";
import { DashboardStyled, DashboardStyledInner, NotesList, PatientList, PatientCard } from "./Dashboard.styled";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Profile, Patient } from "../../api";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import Loader from "../../components/Loader/Loader";
import NoteForm from "../../components/Notes/NoteForm/NoteForm";
import Note from "../../components/Notes/Note/Note";
import { LinkStyled } from "../../components/Navbar/Navbar.styled";

type Props = ReturnType<typeof mapStateToProps>;

const Dashboard = (props: Props) => {
    const [report, setReport] = useState([] as any[]);
    const [notes, setNotes] = useState([] as any[]);
    const [isNotesFetching, setNotesFetching] = useState(true);
    const [isPatientsFetching, setPatientsFetching] = useState(true);
    const [patients, setPatients] = useState([] as any[]);

    useEffect(() => {
        Profile.getReport(7, props.profileId)
            .then(res => {
                console.log(res);
                setReport(res.data.report);
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
                    <NoteForm onNoteAdd={onNoteAdd}></NoteForm>
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
                    {!isPatientsFetching ? (
                        <PatientList>
                            {patients.map((p, index) => {
                                return (
                                    <PatientCard>
                                        <LinkStyled to={"/patient-details/" + p.id}>{p.firstName + " " + p.lastName}</LinkStyled>
                                    </PatientCard>
                                );
                            })}
                        </PatientList>
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
