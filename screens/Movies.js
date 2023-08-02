import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import { Dimensions, FlatList, useColorScheme } from "react-native";
import Slides from "../components/Slides";
import HorizontalMedia from "./HorizontalMedia";
import { useQuery, useQueryClient } from "react-query";
import { movieApi } from "../api";
import Loader from "../components/Loder";
import HorizontalList from "../components/HorizontalList";


const {height : SCREENHEIGHT} = Dimensions.get("window");
// == const SCREENHEIGHT = Dimensions.get("window").height; 위와 같음. 

const Movies = () => {
    const isDark = useColorScheme() === "dark";
    const queryClient = useQueryClient(); // app.js 에서 client를 전역으로 뿌려(감싸)줬기 때문에 사용할 수 있음 
    const [refreshing, setRefreshing] = useState(false);

    const { 
        isLoading: nowPlayingLoading, 
        data: nowPlayingData, 
    } = useQuery(["movies", "nowPlaying"], movieApi.nowPlaying);
    const { 
        isLoading: upcomingLoading,
        data: upcomingData,
    } = useQuery(["movies", "upcoming"], movieApi.upcoming);
    const { 
        isLoading: trendingLoading, 
        data: trendingData, 
    } = useQuery(["movies", "trending"], movieApi.trending);

    const onRefresh = async() => {
        setRefreshing(true);
        await queryClient.refetchQueries(["movies"]); // "movies"라는 key에 포함 된 모든 것들
        setRefreshing(false);
    };

    const renderHorizontalMedia = ({item}) => (
        <HorizontalMedia 
            isDark={isDark}
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
            fullData={item} />
    );

    const movieKeyExtractor = (item) => item.id + "";

    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

    return loading ? (
        <Loader />
    ) : (
        <FlatList 
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListHeaderComponent={
            <>
                <Swiper loop 
                    horizontal
                    autoplay
                    autoplayTimeout={3.5}
                    showsButtons={false}
                    showsPagination={false}
                    containerStyle={{marginBottom: 30, width: "100%", height: SCREENHEIGHT / 4}}>
        
                    {nowPlayingData.results.map((movie) => (
                        <Slides
                            key={movie.id}
                            backdropPath={movie.backdrop_path}
                            posterPath={movie.poster_path}
                            originalTitle={movie.original_title}
                            voteAverage={movie.vote_average}
                            overview={movie.overview}
                            fullData={movie} />
                    ))}
                </Swiper>

                <HorizontalList isDark={isDark} title="Trending Movies" data={trendingData.results}/>

                <CommigTItle isDark={isDark}> Comming soon </CommigTItle>
            </>}

            data={upcomingData.results}
            keyExtractor={movieKeyExtractor}
            ItemSeparatorComponent={HorizontalMediaSeparator}
            renderItem={renderHorizontalMedia}
        />
    );
};

const ListTItle = styled.Text`
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
`;

const CommigTItle = styled(ListTItle)`
    margin-bottom: 20px;
`;

const HorizontalMediaSeparator = styled.View`
    height: 20px;
`;


export default Movies;