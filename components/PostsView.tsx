import React, {useEffect} from 'react';
import {Link} from 'expo-router';
import {StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {useQueries} from '@tanstack/react-query';
import API from '@/utils/dataRESTProvider';
import {ThemedView} from '@/components/ThemedView';
import {ThemedText} from "@/components/ThemedText";
import {PostEntry} from "@/components/PostEntry";
import {useBlogData} from "@/contexts/blogDataPovider";
import {PostsByUserType} from "@/types";

export default function PostsView() {
    const {setPostsByUser} = useBlogData();
    const [usersQuery, postsQuery] = useQueries({
        queries: [
            {queryKey: ['users'], queryFn: API.fetchUsers},
            {queryKey: ['posts'], queryFn: API.fetchPosts},
        ],
    });

    const {data: users, isLoading: isLoadingUsers, error: errorUsers} = usersQuery;
    const {data: posts, isLoading: isLoadingPosts, error: errorPosts} = postsQuery;

    useEffect(()=> {
        if(!posts || !users) return;
        const postsByUser = users.reduce((acc, user) => {
            acc[user.id] = posts.filter((p) => p.userId === user.id);
            return acc;
        }, {} as PostsByUserType);
        setPostsByUser(postsByUser )
    }, [posts, users, setPostsByUser])

    if (isLoadingUsers || isLoadingPosts) {
        return <ThemedView style={styles.loaderContainer}><ActivityIndicator size="large" style={styles.loader}/></ThemedView>;
    }

    if (errorUsers || errorPosts) {
        return <ThemedText style={styles.error}>Error fetching data</ThemedText>;
    }

    const config = {
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 200
    }

    return (

        <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <ThemedView style={styles.userContainer}>
                    <Link
                        href={{
                            pathname: '../user/[user]',
                            params: {userId: item.id.toString()},
                        }}>
                        <ThemedView style={styles.nameContainer}>
                            <ThemedText style={styles.name} >{item.name}</ThemedText>
                        </ThemedView>

                    </Link>

                    <FlatList
                        data={posts?.filter((post) => post.userId === item.id)}
                        horizontal={true}
                        viewabilityConfig={config}
                        keyExtractor={(post) => post.id.toString()}
                        renderItem={({item: post}) =>
                            <Link
                                href={{
                                    pathname: '../post/[id]',
                                    params: {postId: post.id}
                                }}
                            >
                                <PostEntry title={post.title} postId={post.id} body={post.body}/>
                            </Link>
                        }
                    >
                    </FlatList>
                </ThemedView>
            )}
        />


    );
}

const styles = StyleSheet.create({
    nameContainer: {paddingBottom: 10, paddingTop: 10},
    name: {fontSize: 20, fontWeight: "light", textDecorationLine: 'underline'},
    loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    userContainer: {padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 30, maxWidth: 800},
    error: {color: 'red', textAlign: 'center', marginTop: 20},
    loader: {height: 200, width: 200},
});
