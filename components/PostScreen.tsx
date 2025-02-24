import { useLocalSearchParams } from 'expo-router';
import { Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import Comment from '@/components/Comment';
import { ThemedView } from "@/components/ThemedView";

const { width } = Dimensions.get('window');

export default function PostScreen() {
    const { title, blogger, body, comments } = useLocalSearchParams();

    // Parse the comments from the URL params (they are JSON-encoded)
    const parsedComments = comments ? JSON.parse(comments as string) : [];

    return (
        <ThemedView style={styles.container}>
            {/* Post Content */}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.blogger}>By {blogger}</Text>
            <Text style={styles.body}>{body}</Text>

            {/* Comments Section */}
            <Text style={styles.commentsTitle}>Comments:</Text>
            <FlatList
                data={parsedComments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Comment
                        name={item.name}
                        email={item.email}
                        body={item.body}
                        id={item.id}
                        postId={item.postId}
                        style={styles.commentContainer}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatList}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        flexWrap: 'wrap',
        maxWidth: width - 40, // Responsive width
    },
    blogger: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    body: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
        flexWrap: 'wrap',
        maxWidth: width - 40, // Ensuring text adapts
    },
    commentsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    flatList: {
        paddingBottom: 10,
    },
    commentContainer: {
        marginRight: 15, // Space between comments
        width: width * 0.75, // Each comment takes 75% of the screen width
    },
});

