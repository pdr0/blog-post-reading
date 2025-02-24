import { Stack, useNavigation } from "expo-router";
import {useEffect} from "react";

export default function UserLayout() {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({ headerShown: true, headerTitle: 'Author' });
    }, [navigation]);

    return (
        <Stack>
            <Stack.Screen
                name="[user]"
                options={{headerShown: false}}
            />
        </Stack>
    );
}
