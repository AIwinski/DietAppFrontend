import React, { Suspense, lazy, useEffect, ComponentType } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor, history } from "../../store";

import { GlobalStyle } from "../../styles/global";
import BarLoader from "../BarLoader/BarLoader";
import Navbar from "../Navbar/Navbar";
// import ProtectedRoute from "./ProtectedRoute";

import AnimatedSwitch from "../AnimatedSwitch";
import { Route, Redirect } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import ProtectedRoute from "../ProtectedRoute";

import Home from "../../views/Home/Home";

// const Home = lazy(() => import("../../views/Home/Home"));
const Login = lazy(() => import("../../views/Login/Login"));
const Register = lazy(() => import("../../views/Register/Register"));
const Chat = lazy(() => import("../../views/Chat/Chat"));
const RegisterSuccess = lazy(() => import("../../views/RegisterSuccess/RegisterSuccess"));
const ProfileList = lazy(() => import("../../views/ProfileList/ProfileList"));
const Profile = lazy(() => import("../../views/Profile/Profile"));
const ProfileSettings = lazy(() => import("../../views/ProfileSettings/ProfileSettings"));
const Dashboard = lazy(() => import("../../views/Dashboard/Dashboard"));
const VideoChat = lazy(() => import("../../views/VideoChat/VideoChat"));
const NotFound = lazy(() => import("../../views/NotFound/NotFound"));
const AddPatient = lazy(() => import("../../views/AddPatient/AddPatient"));
const PatientDetails = lazy(() => import("../../views/PatientDetails/PatientDetails"));

const App = () => {
    return (
        <Suspense fallback={<BarLoader />}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <ConnectedRouter history={history}>
                        <React.Fragment>
                            <GlobalStyle />
                            <Navbar />
                            <AnimatedSwitch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/register-success" component={RegisterSuccess} />
                                <Route path="/chat" component={Chat} />
                                <Route path="/chat/:id" component={Chat} />
                                <Route path="/list" component={ProfileList} />
                                <Route path="/profile-settings" component={ProfileSettings} />
                                <Route path="/profile/:id" component={Profile} />
                                <Route path="/dashboard" component={Dashboard} />
                                <Route path="/video/:id" component={VideoChat} />
                                <Route path="/not-found" component={NotFound} />
                                <Route path="/add-patient" component={AddPatient} />
                                <Route path="/patient-details/:id" component={PatientDetails} />
                                <Redirect to={{ pathname: "/not-found" }} />
                            </AnimatedSwitch>
                        </React.Fragment>
                    </ConnectedRouter>
                </PersistGate>
            </Provider>
        </Suspense>
    );
};

export default App;
