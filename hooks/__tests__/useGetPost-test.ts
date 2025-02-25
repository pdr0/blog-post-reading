import { renderHook, waitFor } from '@testing-library/react';
import { useGetPost } from '@/hooks/useGetPost';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dataProvider from '@/utils/dataRESTProvider';

// Mock dataProvider
jest.mock('@/utils/dataRESTProvider', () => ({
    fetchPost: jest.fn(),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGetPost', () => {
    it('fetches and returns post data successfully', async () => {
        const mockPost = { id: 1, title: 'Test Post', content: 'This is a test post' };
        (dataProvider.fetchPost as jest.Mock).mockResolvedValue(mockPost);

        const { result } = renderHook(() => useGetPost(1), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(mockPost);
    });

    it('does not fetch when postId is invalid', async () => {
        const { result } = renderHook(() => useGetPost(0), { wrapper });

        expect(result.current.isIdle).toBe(true);
        expect(dataProvider.fetchPost).not.toHaveBeenCalled();
    });

    it('handles errors correctly', async () => {
        (dataProvider.fetchPost as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

        const { result } = renderHook(() => useGetPost(1), { wrapper });

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(result.current.error).toBeDefined();
    });
});
