import React from 'react';
import { render, screen } from '@testing-library/react-native';
import PostCard from '@/components/PostCard';

const mockPost = {
    id: 1,
    title: 'Sample Post',
    body: 'This is a sample post body.',
    userId: 1,
};

const mockUser = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    address: {
        street: '123 Main St',
        suite: 'Apt 4',
        city: 'New York',
        zipcode: '10001',
        geo: { lat: '40.7128', lng: '-74.0060' },
    },
    phone: '123-456-7890',
    website: 'johndoe.com',
    company: {
        name: 'Doe Inc.',
        catchPhrase: 'Innovate and Lead',
        bs: 'tech solutions',
    },
};

const mockComments = [
    { id: 1, postId: 1, name: 'Alice', email: 'alice@example.com', body: 'Nice post!' },
    { id: 2, postId: 1, name: 'Bob', email: 'bob@example.com', body: 'Very informative.' },
];

describe('PostCard Component', () => {
    it('renders post details correctly', () => {
        render(<PostCard post={mockPost} comments={mockComments} user={mockUser} />);

        expect(screen.getByText('Sample Post')).toBeTruthy();
        expect(screen.getByText('This is a sample post body.')).toBeTruthy();
        expect(screen.getByText('John Doe')).toBeTruthy();
        expect(screen.getByText('Comments')).toBeTruthy();
    });

    it('renders comments correctly', () => {
        render(<PostCard post={mockPost} comments={mockComments} user={mockUser} />);

        expect(screen.getByText('Alice:')).toBeTruthy();
        expect(screen.getByText('Nice post!')).toBeTruthy();
        expect(screen.getByText('Bob:')).toBeTruthy();
        expect(screen.getByText('Very informative.')).toBeTruthy();
    });
});
