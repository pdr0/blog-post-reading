import { renderHook, waitFor } from '@testing-library/react';
import { useGetUsers } from '@/hooks/useGetUsers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dataProvider from '@/utils/dataRESTProvider';

// Mock dataProvider
jest.mock('@/utils/dataRESTProvider', () => ({
    fetchUsers: jest.fn(),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGetUsers', () => {
    it('fetches and returns users data successfully', async () => {
        const mockUsers = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
        ];
        (dataProvider.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

        const { result } = renderHook(() => useGetUsers(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(mockUsers);
    });

    it('handles errors correctly', async () => {
        (dataProvider.fetchUsers as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

        const { result } = renderHook(() => useGetUsers(), { wrapper });

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(result.current.error).toBeDefined();
    });
});
