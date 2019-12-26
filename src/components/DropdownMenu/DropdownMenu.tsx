import React, { useState, useRef } from "react";
import { Wrapper, Toggle, LinkElement, List } from "./DropdownMenu.styled";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

type Props = {
    children?: any;
    elements: [
        {
            text: string;
            url: string;
        }
    ];
};

const DropdownMenu = (props: Props) => {
    const ref = useRef(null);
    const [isOpened, setOpened] = useState(false);
    useOutsideAlerter(ref, () => {
        setOpened(false);
    });
    return (
        <Wrapper ref={ref}>
            <Toggle onClick={() => setOpened(!isOpened)}>{props.children}</Toggle>
            {isOpened && (
                <List>
                    {props.elements.map((e, index) => {
                        return (
                            <LinkElement key={index} to={e.url}>
                                {e.text}
                            </LinkElement>
                        );
                    })}
                </List>
            )}
        </Wrapper>
    );
};

export default DropdownMenu;
