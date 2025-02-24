import axios from 'axios';

import type {PostType, CommentType, UserType} from '@/types';

const API = (() => {
    const dataProvider = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    const fetchPosts = async (): Promise<PostType[]> => {
        try {
            const response = await dataProvider.get<PostType[]>('/posts');
            return response.data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    };

    const fetchComments = async (postId: number): Promise<CommentType[]> => {
        try {
            const response = await dataProvider.get<CommentType[]>('/comments', {
                params: { postId },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching comments for post ${postId}:`, error);
            throw error;
        }
    };

    const fetchPost = async (postId: number): Promise<PostType> => {
        try {
            const response = await dataProvider.get<PostType>(`/posts/${postId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching post ${postId}:`, error);
            throw error;
        }
    };

    const fetchUsers = async (): Promise<UserType[]> => {
        try {
            const response = await dataProvider.get<UserType[]>('/users');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    };

    return {
        fetchPosts,
        fetchComments,
        fetchUsers,
        fetchPost
    };
})();

export default API;
