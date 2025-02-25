import {StyleSheet} from 'react-native';

import {useGetComments} from '@/hooks/useGetComments';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";

type PostEntryProps = {
    title: string;
    postId: number;
    body: string
}

export function PostEntry({title, postId, body}: PostEntryProps) {
    const {data: commentsData} = useGetComments(postId);
    const commentsCount = commentsData? commentsData.length : 0;

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>{title}</ThemedText>
            <ThemedText style={styles.body}>{body}</ThemedText>
            <ThemedText style={styles.commentsTitle}>{commentsCount} comments</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        columnGap: 20,
        rowGap: 20,
        padding: 16,
        borderRadius: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        height: 400,
        width: 300,
    },
    title: {
        flexGrow: 2,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    body: {
        fontSize: 16,
        marginBottom: 12,
    },
    commentsTitle: {
        textAlign: 'right',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },
});
