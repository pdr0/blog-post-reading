import { Stack } from 'expo-router';
import {ThemedView} from "@/components/ThemedView";
import PostsView from "@/components/PostsView";

export default function Home() {


    return (
        <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Stack.Screen
                options={{

                }}
            />
            <PostsView/>
        </ThemedView>
    );
}
