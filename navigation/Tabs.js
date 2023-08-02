import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Ionicons } from "@expo/vector-icons"
import { DARK, DARK_LIGHT, DARK_POINT, WHITE_POINT } from "../colors";
 
const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === 'dark';

    return (
        <Tab.Navigator 
            sceneContainerStyle={{
                backgroundColor: isDark ? DARK : "white"
            }}
            screenOptions={{
                unmountOnBlur: true, 
                tabBarStyle: {
                    backgroundColor: isDark ? DARK : "white"
                },
                tabBarActiveTintColor: isDark ? DARK_POINT : DARK, 
                tabBarInactiveTintColor: isDark ? DARK_LIGHT : WHITE_POINT,
                headerStyle: {
                    backgroundColor: isDark ? DARK : "white",
                },
                headerTitleStyle: {
                    color: isDark ? "white" : DARK, 
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "700", 
                    marginTop: -5,
                }
        }}>

            <Tab.Screen name="Movies" component={Movies} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return <Ionicons name={focused ? "film" : "film-outline"} color={color} size={size} />
                }
            }}/>
            <Tab.Screen name="TV" component={Tv} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return <Ionicons name={focused ? "tv" : "tv-outline"} color={color} size={size} />
                }
            }}/>
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return <Ionicons name={focused ? "search" : "search-outline"} color={color} size={size} />
                }
            }}/>

        </Tab.Navigator>
    )
};

export default Tabs; 