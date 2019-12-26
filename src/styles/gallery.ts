import { css } from "styled-components";
import { routerTransition } from "./variables";

export const gallery = css`
.gallery {
    &__container {
        display: grid;
        grid-gap: 2rem;
        grid-template-columns: repeat(8, 1fr);
    }

    &__image--small {
        height: 100%;
        width: 100%;
        cursor: pointer;
        position: relative;

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            object-position: center;
        }
    }
}


.ril__toolbar {
    background-color: transparent !important;
}
`;