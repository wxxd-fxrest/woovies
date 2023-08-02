import React, { useEffect } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, Share } from "react-native";
import { styled } from "styled-components";
import Poster from "../components/Poster";
import { makeImgPath } from "../untils";
import { LinearGradient } from "expo-linear-gradient";
import { DARK, WHITE_POINT } from "../colors";
import { useQuery } from "react-query";
import { movieApi, tvApi } from "../api";
import Loader from "../components/Loder";
import {Ionicons} from "@expo/vector-icons"
import { AntDesign } from '@expo/vector-icons'; 
import * as WebBrowser from "expo-web-browser";

const {height : SCREENHEIGHT} = Dimensions.get("window");

const Detail = ({ navigation: {setOptions}, route: {params} }) => {

    const isMovie = "original_title" in params;
    const { isLoading, data } = useQuery(
        [ isMovie ? "movies" : "tv", params.id], 
        isMovie ? movieApi.detail : tvApi.detail, {
            enabled: "original_title" in params
        }
    );

    useEffect(() => {
        setOptions({
            title: 'original_title' in params ? "Movie" : "TV show",
        }); 
    }, []); 

    const ShareMedia = async() => {
        await Share.share({
            url: isMovie ? `https://www.imdb.com/title/${data.imdb_id}/` : data.homepage,
            title: 'original_title' in params ? params.original_title : params.original_name
        })
    }; 

    useEffect(() => {
        if (data) {
            setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={ShareMedia}>
                        <AntDesign name="sharealt" size={24} color={WHITE_POINT} /> 
                    </TouchableOpacity>
                ),
            });
        }
    }, [data]);

    const goYouTube = async(videoID) => {
        const YouTubeURL = `https://www.youtube.com/watch?v=${videoID}`; 
        // await Linking.openURL(YouTubeURL);
        await WebBrowser.openBrowserAsync(YouTubeURL)
    };

    return (
        <Container showsVerticalScrollIndicator={false}>
            <Header>
                <Background style={StyleSheet.absoluteFill} source={{uri: makeImgPath(params.backdrop_path || "")}}/>
                <LinearGradient colors={["transparent", "rgba(0, 0, 0, 0.5)", DARK]} style={StyleSheet.absoluteFill} />
                <Column>
                    <Poster path={params.poster_path || ""}/>
                    <Title> {'original_title' in params ? params.original_title : params.original_name} </Title>
                </Column>
            </Header>
            <Data>
                <Overview> {params.overview} </Overview>
                { isLoading ? <Loader /> : null }
                {data?.videos?.results?.map((video) => (
                    <VideoButton key={video.key} onPress={() => goYouTube(video.key)}>
                        <Ionicons name="logo-youtube" color="red" size={25}/>
                        <ButtonText> {video.name} </ButtonText>
                    </VideoButton> 
                ))}
            </Data>
        </Container>
    )
};

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
    height: ${SCREENHEIGHT / 3}px;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
    flex-direction: row;
`;

const Title = styled.Text`
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
    font-size: 36px;
    font-weight: 500;
    align-self: flex-end;
    margin-left: 15px;
    flex-shrink: 1;
`;

const Overview = styled.Text`
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
    margin: 20px 0px;
`;

const VideoButton = styled.TouchableOpacity`
    flex-direction: row;
`; 

const ButtonText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
    font-weight: 600;
    margin-bottom: 10px;
    margin-left: 10px;
    line-height: 24px;
`;

const Data = styled.View`
    padding: 0px 20px;
    padding-bottom: 50px;
`; 

export default Detail; 