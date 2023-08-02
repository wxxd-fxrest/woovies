import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import { useColorScheme } from "react-native";
import { DARK } from "../colors";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
    const isDark = useColorScheme() === 'dark';

    return (
        <NativeStack.Navigator 
            screenOptions={{
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: isDark ? DARK : "white"
                },
                headerTitleStyle: {
                    color: isDark ? "white" : DARK
                }
            }}>
            <NativeStack.Screen name="Detail" component={Detail} />
        </NativeStack.Navigator>
    )
};

export default Stack; 