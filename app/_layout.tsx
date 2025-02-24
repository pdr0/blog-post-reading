import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import Header from '@/components/Header';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import {BlogDataProvider} from "@/contexts/blogDataPovider";

import 'react-native-reanimated';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {useColorScheme} from '@/hooks/useColorScheme';
import {Colors} from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();
export default function RootLayout() {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    const [loaded] = useFonts({
        'SpaceMono': 'https://fonts.cdnfonts.com/css/space-mono',
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <BlogDataProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                        <Header/>
                        <Stack
                            screenOptions={{
                                headerStyle: {
                                    backgroundColor: themeColors.background,
                                },
                                headerTintColor: themeColors.tint,
                                headerTitle: 'PostStack',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                            }}
                        >
                            <Stack.Screen name="+not-found"/>
                            <Stack.Screen name="home"  />
                        </Stack>
                        <StatusBar style="auto"/>
                </ThemeProvider>
            </QueryClientProvider>
        </BlogDataProvider>
    );
}

