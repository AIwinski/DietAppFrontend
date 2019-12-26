import { css } from "styled-components";

export const scrollbar = css`
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar:hover {
        background: #ddd;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 4px rgba(148, 148, 148, 0.6);
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgba(156, 156, 156, 0.7);
        border-radius: 3px;
        border: 1px solid rgba(196, 196, 196, 0.7);
    }
    ::-webkit-scrollbar-thumb:hover {
        background: rgba(126, 126, 126, 1);
    }
`;