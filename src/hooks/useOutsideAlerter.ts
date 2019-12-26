import React, { useRef, useEffect } from "react";

function useOutsideAlerter(ref: any, handler: any) {
    function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
            handler()
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
}

export default useOutsideAlerter;