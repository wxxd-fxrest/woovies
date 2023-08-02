import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { darkTheme, lightTheme } from "./styled";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons"
import Root from "./navigation/Root";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components";
// npx pod-install ios

const queryClient = new QueryClient();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

// const loadImages = (images) =>
//     images.map((image) => {
//         if (typeof image === "string") {
//             return Image.prefetch(image);
//         } else {
//             return Asset.loadAsync(image);
//         }
// });

export default function App() {
    const [ready, setReady] = useState(false);

    const onFinish = () => setReady(true);
    const startLoading = async () => {
        const fonts = loadFonts([Ionicons.font]);
        await Promise.all([...fonts]);
    };

    const isDark = useColorScheme() === 'dark';

    if (!ready) {
        return (
            <AppLoading
                startAsync={startLoading}
                onFinish={onFinish}
                onError={console.error}
            />
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                <NavigationContainer>
                    <Root />
                </NavigationContainer>
            </ThemeProvider>
        </QueryClientProvider>
    )
};