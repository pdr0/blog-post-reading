import {Link, useLocalSearchParams} from "expo-router";
import {StyleSheet, FlatList} from "react-native";
import {useBlogData} from "@/contexts/blogDataPovider";
import UserCard from "@/components/UserCard";
import {useQueries} from "@tanstack/react-query";
import API from "@/utils/dataRESTProvider";
import {PostEntry} from "@/components/PostEntry";
import React from "react";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";

export default function PostScreen() {
    const {userId} = useLocalSearchParams<{ userId: string }>();
    const {postsByUser} =useBlogData()
    const [usersQuery] = useQueries({
        queries: [
            {queryKey: ['users'], queryFn: API.fetchUsers}
        ],
    });

    const {data: users} = usersQuery;
    const user = users?.find((u)=> u.id === Number(userId));
    const configView = {
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 200
    }
    if (user && postsByUser) {
        return (
            <ThemedView style={styles.container}>
                <ThemedView style={styles.userContainer}>
                    <UserCard user={user}/>
                </ThemedView>
                <FlatList
                    style={styles.userContainer}
                    data={postsByUser[user.id]}
                    horizontal={true}
                    viewabilityConfig={configView}
                    keyExtractor={(post) => post.id.toString()}
                    renderItem={({item: post}) =>
                        <Link
                            href={{
                                pathname: '../post/[id]',
                                params: {postId: post.id}
                            }}
                        >
                            <PostEntry title={post.title} postId={post.id} userId={post.userId}
                                       body={post.body}/>
                        </Link>
                    }
                >
                </FlatList>
            </ThemedView>
        );
    } else {
        return (<ThemedView style={styles.container}>
            <ThemedText>Not User</ThemedText>
        </ThemedView>)
    }
}

const styles = StyleSheet.create({
    userContainer: {
        maxWidth:800
    },
    container: {flex: 1, padding: 20, alignItems: "center", justifyContent: "center", color: 'white'},
    title: {fontSize: 24, fontWeight: "bold", marginBottom: 10, color: 'white'},
});
