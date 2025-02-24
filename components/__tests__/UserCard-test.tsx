import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import UserCard, { UserType } from '@/components/UserCard';
import { Linking } from 'react-native';

jest.mock('react-native/Libraries/Linking/Linking', () => ({
    openURL: jest.fn(),
}));

describe('UserCard Component', () => {
    const mockUser: UserType = {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        address: {
            street: '123 Main St',
            suite: 'Apt 4B',
            city: 'New York',
            zipcode: '10001',
            geo: {
                lat: '40.7128',
                lng: '-74.0060',
            },
        },
        phone: '123-456-7890',
        website: 'johndoe.com',
        company: {
            name: 'Doe Enterprises',
            catchPhrase: 'Innovate and Elevate',
            bs: 'business solutions',
        },
    };

    it('renders user details correctly', () => {
        render(<UserCard user={mockUser} />);

        expect(screen.getByText('John Doe')).toBeTruthy();
        expect(screen.getByText('@johndoe')).toBeTruthy();
        expect(screen.getByText(/johndoe@example.com/i)).toBeTruthy();
        expect(screen.getByText(/123-456-7890/i)).toBeTruthy();
        expect(screen.getByText(/johndoe.com/i)).toBeTruthy();
        expect(screen.getByText(/Doe Enterprises/i)).toBeTruthy();
        expect(screen.getByText(/Innovate and Elevate/i)).toBeTruthy();
        expect(screen.getByText(/business solutions/i)).toBeTruthy();
        expect(screen.getByText(/123 Main St, Apt 4B, New York, 10001/i)).toBeTruthy();
    });

    it('opens map when "Open in Maps" is pressed', () => {
        render(<UserCard user={mockUser} />);

        const mapLink = screen.getByText(/Open in Maps/i);
        fireEvent.press(mapLink);

        expect(Linking.openURL).toHaveBeenCalledWith(
            'https://www.google.com/maps/search/?api=1&query=40.7128,-74.0060'
        );
    });
});
