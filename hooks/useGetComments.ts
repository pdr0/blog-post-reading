import { useQuery } from '@tanstack/react-query';
import dataProvider from '@/utils/dataRESTProvider';

export const useGetComments = (postId: number) => {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => dataProvider.fetchComments(postId),
        enabled: !!postId,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};
