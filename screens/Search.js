import React, { useState } from "react";
import { useColorScheme } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components";
import { movieApi, tvApi } from "../api";
import { DARK, WHITE_POINT } from "../colors";
import HorizontalList from "../components/HorizontalList";
import Loader from "../components/Loder";
import { darkTheme, lightTheme } from "../styled";

const Search = () => {
    const isDark = useColorScheme() === "dark";
    const [query, setQuery] = useState("");
    const {
        isLoading: movieLoading, 
        data: movieData, 
        refetch: searchMovies
    } = useQuery(["searchMovies", query], 
        movieApi.search, {
            enabled: false,
    });

    const {
        isLoading: tvLoading, 
        data: tvData, 
        refetch: searchTV
    } = useQuery(["searchTv", query], 
        tvApi.search, {
            enabled: false,
    });

    const onChangeText = (text) => setQuery(text);

    const onSubmit = () => {
        if(query === "") {
            return; 
        }
        searchMovies();
        searchTV();
    };

    return(
        <Container>
            <SearchInput isDark={isDark}
                placeholder="Search for Movie or TV Show" 
                placeholderTextColor={isDark ?  lightTheme.textColor : darkTheme.textColor} 
                returnKeyType="search"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
                />
            {movieLoading || tvLoading ? <Loader /> : null}
            {movieData ? <HorizontalList title="Movie Results" data={movieData.results} isDark={isDark} /> : null}
            {tvData ? <HorizontalList title="TV Results" data={tvData.results} isDark={isDark} /> : null}
        </Container>
    );
}
const Container = styled.View``;

const SearchInput = styled.TextInput`
    background-color: ${(props) => (props.isDark ? "white" : WHITE_POINT)};
    color:  ${(props) => (props.isDark ? DARK : "white")};
    padding: 10px 35px;
    border-radius: 15px;
    width: 90%;
    margin: 10px auto;
    margin-bottom: 40px;
`;

export default Search;