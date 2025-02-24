import React from "react";
import {StyleSheet, FlatList} from "react-native";

import type {PostType, CommentType, UserType} from "@/types";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Link} from "expo-router";

interface PostCardProps {
    post: PostType;
    comments: CommentType[]
    user: UserType
}

// PostCard Component
const PostCard: React.FC<PostCardProps> = ({post, comments, user}) => {

    return (
        <ThemedView style={styles.card}>
            <ThemedText style={styles.title}>{post.title}</ThemedText>
            <ThemedText style={styles.body}>{post.body}</ThemedText>
            <Link
                style={styles.authorContainer}
                href={{
                    pathname: '../user/[user]',
                    params: {userId: user.id.toString()},
                }}>
                <ThemedText style={styles.author}>{user.name}</ThemedText>

            </Link>


            <ThemedText style={styles.commentHeader}>Comments</ThemedText>

            <FlatList
                data={comments}
                removeClippedSubviews={false}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={true}
                renderItem={({item}) => (
                    <ThemedView style={styles.comment}>
                        <ThemedText style={styles.commentName}>{item.name}:</ThemedText>
                        <ThemedText style={styles.commentBody}>{item.body}</ThemedText>
                        <ThemedText style={styles.commentEmail}>{item.email}</ThemedText>
                    </ThemedView>
                )}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        margin: 10,
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Android shadow
        // minHeight: 1000,
        // overflow:"scroll"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    author: {
        marginVertical: 30,

        textDecorationLine: 'underline'
    },
    authorContainer: {
        marginVertical: 20,
        textAlign: 'right',
    },
    avatarText: {
        color: "#fff",
        fontWeight: "bold",
    },
    userId: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
        color: "#6200ea",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",

    },
    body: {
        fontSize: 18,
        color: "#555",

    },
    commentHeader: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 15,
        color: "#444",
    },
    comment: {
        marginTop: 8,
        padding: 8,
        backgroundColor: "#f5f5f5",
        borderRadius: 6,
    },
    commentName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#222",
    },
    commentEmail: {
        fontSize: 12,
        color: "#666",
        marginBottom: 4,
    },
    commentBody: {
        fontSize: 16,
        color: "#333",
        fontStyle: 'italic'
    },
});

export default PostCard;
