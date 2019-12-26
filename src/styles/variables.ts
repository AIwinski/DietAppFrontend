export const COLORS = {
    white: "#FFFFFF",
    black: "#000000",
    gray: "#E1E1E1",
    golden: "#CD9843",
    lightgray: "#EEEEEE",
    blue: "#3b95f5",
    darkblue: "#277cd6"
};

export const BREAKPOINTS = {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px"
};

export const routerTransition = {
    appear: 300,
    enter: 500,
    exit: 375
}

export const NAV_HEIGHT = "55px";
export const NAV_MARGIN = "1.5rem";
export const NAV_HEADROOM = `calc(${NAV_HEIGHT + ' + ' + NAV_MARGIN})`
export const CONTAINER_FLUID_GUTTER_REM = 2;


const GUTTER_REM = 0.5;
export const GUTTER = (multiplier = 1) => {
    return multiplier * GUTTER_REM + "rem";
};