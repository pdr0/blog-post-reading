import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { PostEntry } from '@/components/PostEntry';
import { useGetComments } from '@/hooks/useGetComments';

jest.mock('@/hooks/useGetComments', () => ({
    useGetComments: jest.fn(),
}));

describe('PostEntry Component', () => {
    it('renders post details correctly', () => {
        (useGetComments as jest.Mock).mockReturnValue({ data: [] });

        render(<PostEntry title="Sample Post" postId={1} userId={2} body="This is a sample post body." />);

        expect(screen.getByText('Sample Post')).toBeTruthy();
        expect(screen.getByText('This is a sample post body.')).toBeTruthy();
        expect(screen.getByText('0 comments')).toBeTruthy();
    });

    it('displays the correct number of comments', () => {
        (useGetComments as jest.Mock).mockReturnValue({ data: [
                { id: 1, postId: 1, body: 'Nice post!' },
                { id: 2, postId: 1, body: 'Very informative.' },
            ] });

        render(<PostEntry title="Sample Post" postId={1} userId={2} body="This is a sample post body." />);

        expect(screen.getByText('2 comments')).toBeTruthy();
    });
});
