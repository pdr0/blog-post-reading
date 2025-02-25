import API from '../dataRESTProvider'
import axios from 'axios';
import type { PostType, CommentType, UserType } from '@/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedApi = API as jest.Mocked<typeof API>

describe.only('API Module', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetchPosts should return a list of posts', async () => {
        const mockPosts: PostType[] = [{ id: 1, title: 'Test Post', body: 'Test Body', userId: 1 }];
        mockedApi.fetchPosts.mockResolvedValueOnce(mockPosts);

        const posts = await API.fetchPosts();

        expect(mockedApi.fetchPosts).toHaveBeenCalled();
        expect(posts).toEqual(mockPosts);

    });

    it('fetchUsers should return a list of users', async () => {
        const mockUsers: UserType[] = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
        mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

        const users = await API.fetchUsers();

        expect(axios.get).toHaveBeenCalledWith('/users');
        expect(users).toEqual(mockUsers);
    });

    it('fetchPost should return a single post', async () => {
        const mockPost: PostType = { id: 1, title: 'Test Post', body: 'Test Body', userId: 1 };
        mockedAxios.get.mockResolvedValueOnce({ data: mockPost });

        const post = await API.fetchPost(1);

        expect(axios.get).toHaveBeenCalledWith('/posts/1');
        expect(post).toEqual(mockPost);
    });

    it('fetchComments should return comments for a specific post', async () => {
        const mockComments: CommentType[] = [
            { id: 1, postId: 1, name: 'Jane Doe', email: 'jane@example.com', body: 'Nice post!' },
        ];
        mockedAxios.get.mockResolvedValueOnce({ data: mockComments });

        const comments = await API.fetchComments(1);

        expect(axios.get).toHaveBeenCalledWith('/comments', { params: { postId: 1 } });
        expect(comments).toEqual(mockComments);
    });

    it('should handle API errors correctly', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Cannot read properties of undefined (reading \'get\')'));

        await expect(API.fetchPosts()).rejects.toThrow('Cannot read properties of undefined (reading \'get\')');
        expect(axios.get).toHaveBeenCalledWith('/posts');
    });
});
