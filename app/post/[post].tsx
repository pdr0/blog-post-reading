import {useLocalSearchParams} from "expo-router";
import {StyleSheet, ActivityIndicator} from "react-native";
import PostCard from "@/components/PostCard";
import {UserType} from "@/types";
import {ThemedView} from "@/components/ThemedView";

import {useQueries} from "@tanstack/react-query";
import API from "@/utils/dataRESTProvider";
import {useGetComments} from "@/hooks/useGetComments";
import {useGetPost} from "@/hooks/useGetPost";
import {ThemedText} from "@/components/ThemedText";

export default function PostScreen() {
    const {postId} = useLocalSearchParams<{ postId: string }>();
    const {data: commentsData, isLoading: isLoadingComments, isError: isErrorComments} = useGetComments(Number(postId));
    const {data: postData, isLoading: isLoadingPost, isError: isErrorPost} = useGetPost(Number(postId));
    const [usersQuery] = useQueries({
        queries: [
            {queryKey: ['users'], queryFn: API.fetchUsers}
        ],
    });

    const {data: users, isLoading: isLoadingUsers} = usersQuery;
    const user = users?.find((u) => u.id === postData?.userId);

    if (isLoadingUsers || isLoadingPost) {
        return <ThemedView style={styles.loaderContainer}><ActivityIndicator size="large" style={styles.loader}/></ThemedView>;
    }

    if (isErrorComments || isErrorPost) {
        return <ThemedText style={styles.error}>Error fetching data</ThemedText>;
    }

    if (postData && commentsData && user && !isLoadingPost && !isLoadingComments) {
        return (
            <PostCard post={postData} comments={commentsData} user={user as UserType}/>
        );
    } else {
        return (<ThemedView style={styles.container}>
            <ThemedText>Not Post</ThemedText>
        </ThemedView>)
    }
}

const styles = StyleSheet.create({
    loader: {width: 200, height: 200},
    title: {fontSize: 24, fontWeight: "bold", marginBottom: 10, color: 'white'},
    loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    error: {color: 'red', textAlign: 'center', marginTop: 20},
    container: {textAlign: 'center', marginTop: 20}
});
