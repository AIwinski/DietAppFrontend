import { css } from "styled-components";
import { routerTransition } from "./variables";

export const router = css`
    .router-enter {
        opacity: 0.01;
        transform: translate3d(0, 12px, 0);
    }

    .router-enter-active {
        opacity: 1;
        transform: translate3d(0, 0px, 0);
        transition: all ${routerTransition.exit}ms ${routerTransition.enter - routerTransition.exit}ms;
    }

    .router-exit {
        opacity: 1;
        transform: translate3d(0, 0px, 0);
    }

    .router-exit-active {
        opacity: 0.01;
        transform: translate3d(0, 12px, 0);
        transition: all ${routerTransition.exit}ms;
    }
`;