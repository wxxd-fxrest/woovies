import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import Poster from "../components/Poster";

const HorizontalMedia = ({posterPath, originalTitle, overview, releaseDate, isDark, fullData}) => {
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
            <HorizontalMovie>
                <Poster path={posterPath} />
                <HorizontalColumn>
                    <HorizontalTitle isDark={isDark}> 
                        {originalTitle.slice(0, 80)} 
                        {originalTitle.length > 13 ? "..." : null} 
                    </HorizontalTitle>
                    <Release isDark={isDark}>
                        {new Date(releaseDate).toLocaleDateString("ko")}
                    </Release>
                    <Overview isDark={isDark}> 
                        {overview !== "" && overview.length > 80 ? 
                            `${overview.slice(0, 80)}...` : overview} 
                    </Overview>
                </HorizontalColumn>
            </HorizontalMovie>
        </TouchableOpacity>
    )
};

const HorizontalMovie = styled.View`
    padding: 0px 30px;
    flex-direction: row;
`;

const HorizontalColumn = styled.View`
    margin-left: 15px;
    width: 80%;
`;

const HorizontalTitle = styled.Text`
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
    font-size: 16px;
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
`;

const Overview = styled.Text`
    color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)")};
    margin-top: 5px;
    font-size: 14px;
    width: 80%;
`;

const Release = styled.Text`
    color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)")};
    font-size: 12px;
`;


export default HorizontalMedia;