import { useLocalSearchParams } from 'expo-router';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Comment from '@/components/Comment';

export default function PostScreen() {
    const { title, blogger, body, comments } = useLocalSearchParams();

    // Parse the comments from the URL params (they are JSON-encoded)
    const parsedComments = comments ? JSON.parse(comments as string) : [];

    return (
        <View style={styles.container}>
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
                    <Comment name={item.name} email={item.email} body={item.body} id={item.id} postId={item.postId} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
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
    },
    commentsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
});
