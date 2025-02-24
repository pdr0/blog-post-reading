import { useQuery } from '@tanstack/react-query';
import dataProvider from '@/utils/dataRESTProvider';

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => dataProvider.fetchUsers(),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
    });
};
