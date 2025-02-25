import { renderHook, waitFor } from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { useGetComments } from '@/hooks/useGetComments';
import dataProvider from '@/utils/dataRESTProvider';
import type { CommentType } from '@/types';

jest.mock('@/utils/dataRESTProvider');
const mockFetchComments = dataProvider.fetchComments as jest.MockedFunction<typeof dataProvider.fetchComments>;

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useGetComments Hook', () => {
    afterEach(() => {
        queryClient.clear();
        jest.clearAllMocks();
    });

    it('fetches comments successfully', async () => {
        const mockComments: CommentType[] = [
            { id: 1, postId: 1, name: 'John Doe', email: 'john@example.com', body: 'Nice post!' },
        ];

        mockFetchComments.mockResolvedValueOnce(mockComments);

        const { result } = renderHook(() => useGetComments(1), { wrapper });

        await waitFor(() => expect(result.current.data).toEqual(mockComments));

        expect(mockFetchComments).toHaveBeenCalledWith(1);
        expect(result.current.isSuccess).toBe(true);
    });

    it('handles API errors correctly', async () => {
        mockFetchComments.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useGetComments(1), { wrapper });

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(mockFetchComments).toHaveBeenCalledWith(1);
        expect(result.current.error).toBeInstanceOf(Error);
    });

    it('does not fetch comments if postId is falsy', async () => {
        const { result } = renderHook(() => useGetComments(0), { wrapper });

        expect(result.current.isFetching).toBe(false);
        expect(mockFetchComments).not.toHaveBeenCalled();
    });
});
