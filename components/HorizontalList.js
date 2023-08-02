import React from "react";
import { FlatList } from "react-native";
import { styled } from "styled-components";
import VerticalMidia from "../screens/VerticalMidia";

const HorizontalList = ({title, data, isDark}) => {
    const movieKeyExtractor = (item) => item.id + "";

    return (
        <ListContainer>
            <ListTItle isDark={isDark}> {title} </ListTItle>
            <FlatList horizontal
                data={data}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={VerticalMidiaSeparator}
                contentContainerStyle={{paddingHorizontal: 30}}
                renderItem={({item}) => (
                    <VerticalMidia
                        isDark={isDark}
                        keyExtractor={movieKeyExtractor}
                        posterPath={item.poster_path}
                        originalTitle={item.original_title ?? item.original_name}
                        voteAverage={item.vote_average} 
                        fullData={item}/>
                )} />
        </ListContainer>
    );
};

const ListContainer = styled.View`
    margin-bottom: 40px;
`;

const ListTItle = styled.Text`
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
    margin-bottom: 20px;
`;

const VerticalMidiaSeparator = styled.View`
    width: 20px;
`;

export default HorizontalList; 