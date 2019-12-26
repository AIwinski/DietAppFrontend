import React, { useEffect } from "react";
import { HomeStyled } from "./Home.styled";
import Loader from "../../components/Loader/Loader";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import Rating from "../../components/Rating/Rating";
import DebouncedSearchInput from "../../components/DebouncedSearchInput/DebouncedSearchInput";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { Chat } from "../../api";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import Avatar from "../../components/Avatar/Avatar";

const Home = () => {
    useDocumentTitle("Home");

    useEffect(() => {
        // Chat.getConversations()
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));
    }, []);

    return (
        <HomeStyled>
            <ContainerFluid>
                SIEMA
                <Rating numberOfRatings={5} rating={3.4}></Rating>
                <DebouncedSearchInput
                    dataSource={i => {
                        return {};
                    }}
                    delay={500}
                    callback={d => {
                        console.log(d);
                    }}
                    name="search"
                    placeholder="search"
                ></DebouncedSearchInput>
                <Loader></Loader>
            </ContainerFluid>
        </HomeStyled>
    );
};

export default Home;
