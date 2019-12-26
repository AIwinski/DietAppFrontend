import React from "react";
//@ts-ignore
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
    barColors: {
        "0": "#3b95f5",
        "1.0": "#3b95f5"
    },
    shadowColor: "#0b05f5"
});


const BarLoader = () => {
    return <TopBarProgress />;
};

export default BarLoader;