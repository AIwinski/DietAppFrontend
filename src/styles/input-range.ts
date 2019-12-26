import { css } from "styled-components";
import { routerTransition } from "./variables";

export const inputRange = css`
    .input-range {
        padding: 3rem 0rem;
        
        &__label-container {
            font-size: 1.6rem !important;
        }

        &__label--value {
            top: -3rem !important;
        }

        &__label--max {
            bottom: -0.4rem !important;
        }

        &__label--min {
            bottom: -0.4rem !important;
        }
    }
`;