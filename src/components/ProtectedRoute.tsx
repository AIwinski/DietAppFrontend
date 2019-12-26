import React from "react";
import { Route, Redirect } from "react-router";

const PrivateRoute = ({ component, isAuthenticated, isProperRole, ...rest }: any) => {
    const routeComponent = (props: any) =>
        isAuthenticated ? (
            isProperRole ? (
                React.createElement(component, props)
            ) : (
                <Redirect to={{ pathname: "/not-found" }} />
            )
        ) : (
            <Redirect to={{ pathname: "/login" }} />
        );
    return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
