import React from 'react';
import { render } from '@testing-library/react-native';
import PostScreen from '@/components/PostScreen';
import { useLocalSearchParams } from 'expo-router';

// Mock the useLocalSearchParams hook
jest.mock('expo-router', () => ({
    useLocalSearchParams: jest.fn(),
}));

jest.mock('@/components/ThemedView', () => ({
    ThemedView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/components/Comment', () => 'MockedComment');

describe('PostScreen Snapshot Test', () => {
    it('renders correctly and matches snapshot', () => {
        (useLocalSearchParams as jest.Mock).mockReturnValue({
            title: 'Test Post',
            blogger: 'John Doe',
            body: 'This is a test post content.',
            comments: JSON.stringify([
                { id: 1, name: 'Alice', email: 'alice@example.com', body: 'Great post!', postId: 1 },
                { id: 2, name: 'Bob', email: 'bob@example.com', body: 'Nice read!', postId: 1 },
            ]),
        });

        const { toJSON } = render(<PostScreen />);
        expect(toJSON()).toMatchSnapshot();
    });
});
