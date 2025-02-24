import { useQuery } from '@tanstack/react-query';
import dataProvider from '@/utils/dataRESTProvider';

export const useGetPost = (postId: number) => {
    return useQuery({
        queryKey: ['post', postId],
        queryFn: () => dataProvider.fetchPost(postId),
        enabled: !!postId,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};
