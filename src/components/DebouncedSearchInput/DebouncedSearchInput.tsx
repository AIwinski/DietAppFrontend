import React, { useState, useEffect, RefObject, createRef, FormEvent, KeyboardEvent, MouseEvent, useRef } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { Form, Input, ResultsContainer, ResultsElement } from "./DebouncedSearchInput.styled";

type Props = {
    dataSource: (input: string) => {};
    delay: number;
    callback: (id: string) => any;
    placeholder: string;
    name: string;
};

const DebouncedSearchInput = (props: Props) => {
    //propsy: funkcja zwracajaca dane lub blad od api, delay, ilosc wyswietlanych wynikow pod inputem, callback po submicie, placeholder inputu, name inputu

    const searchAPIDebounced = AwesomeDebouncePromise(props.dataSource, props.delay);

    let formRef: RefObject<HTMLFormElement> = useRef(null);

    const [input, setInput] = useState("");
    const [results, setResults] = useState([] as any[]);
    const [isFocused, setFocused] = useState(false);
    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        if (selected !== -1) {
            setInput(results[selected].owner.displayName);
        }
    }, [selected]);

    const onKeydown = async (e: KeyboardEvent<HTMLFormElement>) => {
        if (!isFocused || results.length === 0) {
            return;
        }

        if (e.key === "Escape") {
            setFocused(false);
        } else if (e.key === "ArrowDown") {
            if (selected === results.length - 1 || selected === -1) {
                setSelected(0);
            } else {
                setSelected(selected + 1);
            }
        } else if (e.key === "ArrowUp") {
            if (selected === 0 || selected === -1) {
                setSelected(results.length - 1);
            } else {
                setSelected(selected - 1);
            }
        }
    };

    const onInputChange = async (e: FormEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;
        setInput(inputValue);
        setFocused(false);
        setSelected(-1);
        if (inputValue.length < 1) {
            setResults([]);
        } else {
            const searchResults = await searchAPIDebounced(inputValue);
            console.log(searchResults);
            setFocused(true);
            // @ts-ignore
            setResults(searchResults.data.result);
        }
    };

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFocused(false);
        props.callback(results[selected].id);
    };

    const onFocus = () => {
        setFocused(true);
    };

    const handleClickOutside = (event: Event) => {
        if (formRef.current && !formRef.current.contains(event.target as Node)) {
            setFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Form ref={formRef} onSubmit={onFormSubmit} onKeyDown={onKeydown}>
            <Input
                formHasResults={results && results.length > 0}
                autoFocus={false}
                autoComplete="off"
                type="text"
                onChange={onInputChange}
                value={input}
                name={props.name}
                placeholder={props.placeholder}
                onFocus={onFocus}
            />
            {isFocused && (
                <ResultsContainer>
                    {results.map((element: any, index: number) => (
                        <ResultsElement
                            onClick={(e: MouseEvent<HTMLDivElement>) => {
                                props.callback(results[index].id);
                            }}
                            key={index}
                            selected={selected === index}
                        >
                            {element.owner.displayName + " " + element.city}
                        </ResultsElement>
                    ))}
                </ResultsContainer>
            )}
        </Form>
    );
};

export default DebouncedSearchInput;
