import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export type CommentPropsType = {
    name: string;
    body: string;
    email: string;
};

const Comment: React.FC<CommentPropsType> = ({ name, body, email }) => {
    return (
        <ThemedView style={styles.comment}>
            <ThemedText style={styles.commentName}>{name}:</ThemedText>
            <ThemedText style={styles.commentBody}>{body}</ThemedText>
            <ThemedText style={styles.commentEmail}>{email}</ThemedText>
        </ThemedView>
    );
};

Comment.propTypes = {
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
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

export default Comment;
