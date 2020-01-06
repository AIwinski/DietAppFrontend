import styled from "styled-components";
import { BREAKPOINTS, CONTAINER_FLUID_GUTTER_REM } from "../../styles/variables";

type Props = {
    maxheight?: boolean
}

export const ContainerFluid = styled.div<Props>`
    display: block;
    padding-left: ${8 * CONTAINER_FLUID_GUTTER_REM}rem;
    padding-right: ${8 * CONTAINER_FLUID_GUTTER_REM}rem;
    @media (max-width: ${BREAKPOINTS.xl}) {
        padding-right: ${6 * CONTAINER_FLUID_GUTTER_REM}rem;
        padding-left: ${6 * CONTAINER_FLUID_GUTTER_REM}rem;
    }
    @media (max-width: ${BREAKPOINTS.lg}) {
        padding-right: ${4 * CONTAINER_FLUID_GUTTER_REM}rem;
        padding-left: ${4 * CONTAINER_FLUID_GUTTER_REM}rem;
    }
    @media (max-width: ${BREAKPOINTS.md}) {
        padding-right: ${2 * CONTAINER_FLUID_GUTTER_REM}rem;
        padding-left: ${2 * CONTAINER_FLUID_GUTTER_REM}rem;
    }
    @media (max-width: ${BREAKPOINTS.sm}) {
        padding-right: ${CONTAINER_FLUID_GUTTER_REM}rem;
        padding-left: ${CONTAINER_FLUID_GUTTER_REM}rem;
    }
    
    ${({ maxheight }) =>
        maxheight &&
        `
            height: 100%
        `}

    width: 100%;
    max-width: 100vw;
`;