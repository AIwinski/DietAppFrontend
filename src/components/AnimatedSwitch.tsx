import React, { Suspense } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, withRouter, RouteComponentProps } from "react-router";
import BarLoader from "./BarLoader/BarLoader";
import { routerTransition } from "../styles/variables";

type Props = {
    children: JSX.Element[] | JSX.Element | string;
} & RouteComponentProps;

const AnimatedSwitch = (props: Props) => (
    <TransitionGroup>
        <CSSTransition
            key={props.location.pathname.split("/")[1] || "/"}
            classNames="router"
            timeout={{ appear: routerTransition.appear, enter: routerTransition.enter, exit: routerTransition.exit }}
            appear={true}
        >
            <div className="page-wrapper">
                <Suspense fallback={<BarLoader />}>
                    <Switch location={props.location}>{props.children}</Switch>
                </Suspense>
            </div>
        </CSSTransition>
    </TransitionGroup>
);

export default withRouter(AnimatedSwitch);
