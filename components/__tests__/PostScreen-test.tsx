import React from 'react';
import { render, screen } from '@testing-library/react-native';
import PostScreen from '@/components/PostScreen';
import { useLocalSearchParams } from 'expo-router';

jest.mock('expo-router', () => ({
    useLocalSearchParams: jest.fn(),
}));

describe('PostScreen Component', () => {
    it('renders post details correctly', () => {
        (useLocalSearchParams as jest.Mock).mockReturnValue({
            title: 'Test Post',
            blogger: 'John Doe',
            body: 'This is a test post body.',
            comments: JSON.stringify([
                { id: '1', name: 'Alice', email: 'alice@example.com', body: 'Great post!', postId: '101' },
                { id: '2', name: 'Bob', email: 'bob@example.com', body: 'Very informative.', postId: '101' },
            ]),
        });

        render(<PostScreen />);

        expect(screen.getByText('Test Post')).toBeTruthy();
        expect(screen.getByText('By John Doe')).toBeTruthy();
        expect(screen.getByText('This is a test post body.')).toBeTruthy();
        expect(screen.getByText('Comments:')).toBeTruthy();
        expect(screen.getByText('Great post!')).toBeTruthy();
        expect(screen.getByText('Very informative.')).toBeTruthy();
    });
});
