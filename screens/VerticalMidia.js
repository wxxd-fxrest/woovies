import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import Poster from "../components/Poster";
import Votes from "./Votes";

const VerticalMidia = ({isDark, posterPath, originalTitle, voteAverage, fullData}) => {
    const navigation = useNavigation();

    const goDetail = () => {
        navigation.navigate("Stack", {
            screen: "Detail", 
            params: {
                ...fullData, 
            },
        });
    };
     
    return (
        <TouchableOpacity onPress={goDetail}>
            <Movie>
                <Poster path={posterPath} />
                <Title isDark={isDark} numberOfLines={1}> 
                    {originalTitle}
                </Title>
                <Votes isDark={isDark} votes={voteAverage} />
            </Movie>
        </TouchableOpacity>
    )
};

const Movie = styled.View``;

const Title = styled.Text`
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
    font-size: 16px;
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
    width: 100px;
`;

export default VerticalMidia;