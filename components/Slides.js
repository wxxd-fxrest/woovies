import React from "react";
import styled from "styled-components";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { makeImgPath } from "../untils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";
import Votes from "../screens/Votes.js";
import { useNavigation } from "@react-navigation/native";

const Slides = ({backdropPath, posterPath, originalTitle, voteAverage, overview, isDark, fullData}) => {
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
        <TouchableWithoutFeedback onPress={goDetail}>
            <Container>
                <BgImg
                    style={StyleSheet.absoluteFill}
                    source={{ uri: makeImgPath(backdropPath) }}/>
                <BlurView 
                    tint={isDark ? "dark" : "light"}
                    intensity={80} 
                    style={StyleSheet.absoluteFill}>
                    <Wrapper>
                        <Poster path={posterPath} />
                        <Column>
                            <Title isDark={isDark}> {originalTitle} </Title>
                            <Votes isDark={isDark} votes={voteAverage} />
                            <Overview isDark={isDark}> {overview.slice(0, 90)}... </Overview>
                        </Column>
                    </Wrapper>
                </BlurView>
            </Container>
        </TouchableWithoutFeedback>
    )
};

const Container = styled.View`
    background-color: yellowgreen;
    flex: 1;
`;

const BgImg = styled.Image``;

const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Column = styled.View`
    width: 40%;
    margin-left: 15px;
`;

const Title = styled.Text`
    color: ${(props) => (props.isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")};
    font-size: 16px;
    font-weight: 600;
`;


const Overview = styled(Votes)`
    margin-top: 10px;
    font-size: 14px;
`;

export default Slides;