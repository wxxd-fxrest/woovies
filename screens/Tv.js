import React, { useState } from "react";
import { ScrollView, useColorScheme, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HorizontalList from "../components/HorizontalList";
import Loader from "../components/Loder";

const Tv = () => {
    const isDark = useColorScheme() === "dark";
    const queryClient = useQueryClient(); // app.js 에서 client를 전역으로 뿌려(감싸)줬기 때문에 사용할 수 있음 
    const [refreshing, setRefreshing] = useState(false);

    const {
        isLoading: todayLoading, 
        data: todayData, 
    } = useQuery(["tv", "today"], tvApi.airingToday);
    const {
        isLoading: topLoading, 
        data: topData, 
    } = useQuery(["tv", "top"], tvApi.topRated);
    const {
        isLoading: trendingLoading, 
        data: trendingData, 
    } = useQuery(["tv", "trending"], tvApi.trending);

    const onRefresh = async() => {
        setRefreshing(true);
        await queryClient.refetchQueries(["tv"]); // "movies"라는 key에 포함 된 모든 것들
        setRefreshing(false);
    };

    const loading = todayLoading || topLoading || trendingLoading;

    if(loading) {
        return <Loader />;
    }

    return(
        <ScrollView 
            refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>}
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{paddingVertical: 30}}>
            <HorizontalList isDark={isDark} title="Trending TV" data={trendingData.results}/>
            <HorizontalList isDark={isDark} title="Airing Today" data={todayData.results}/>
            <HorizontalList isDark={isDark} title="Top Rated TV" data={topData.results}/>
        </ScrollView>
    );
};

export default Tv;