import { createGlobalStyle } from "styled-components";
import { BREAKPOINTS, NAV_HEADROOM } from "./variables";
import { scrollbar } from "./scrollbar";
import { router } from "./router";
import { gallery } from "./gallery";
import { inputRange } from "./input-range";

export const GlobalStyle = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");
    html,
    body {
        font-size: 62.5%;
        @media (max-width: ${BREAKPOINTS.xl}) {
            font-size: 60%;
        }
        @media (max-width: ${BREAKPOINTS.lg}) {
            font-size: 57.5%;
        }
        @media (max-width: ${BREAKPOINTS.md}) {
            font-size: 55%;
        }
        @media (max-width: ${BREAKPOINTS.sm}) {
            font-size: 52.5%;
        }

    
        scroll-behavior: smooth;

    }
    body {
        overflow: overlay;
        font-size: 1.6rem;
        line-height: 2.4rem;
        font-family: "Roboto", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
        box-sizing: border-box;
    }
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }
    ol,
    ul {
        list-style: none;
    }
    blockquote,
    q {
        quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: "";
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    .page-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-top: ${NAV_HEADROOM};
        box-sizing: border-box;
        display: block;
    }
    ${scrollbar}
    ${router}
    ${gallery}
    ${inputRange}
`;