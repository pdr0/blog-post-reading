import {Stack, useNavigation} from "expo-router";
import {useEffect} from "react";
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useColorScheme} from "@/hooks/useColorScheme";

export default function PostLayout() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    useEffect(() => {
        navigation.setOptions({headerShown: true});
    }, [navigation]);

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen
                    name="[post]"
                    options={{headerShown: false}}
                />
            </Stack>
        </ThemeProvider>
    );
}
