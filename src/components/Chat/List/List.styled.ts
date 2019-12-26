import styled from "styled-components";
import { NAV_HEADROOM } from "../../../styles/variables";

export const ListStyled = styled.div`
    min-height: calc(100vh - ${NAV_HEADROOM});
    overflow: auto;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid red;
    position: relative;
`;

export const ListInfo = styled.div`
    color: red;
`