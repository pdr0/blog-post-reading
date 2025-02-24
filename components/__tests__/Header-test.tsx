import React from 'react';
import { render } from '@testing-library/react-native';
import Header from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Image } from 'react-native';

jest.mock('expo-router', () => ({
    Link: jest.fn(({ children }) => children),
}));

jest.mock('@/components/ThemedView', () => ({
    ThemedView: jest.fn(({ children }) => children),
}));


describe('Header Component', () => {
    it('renders the logo inside a link', () => {
        const { getByTestId } = render(<Header />);
        const logo = getByTestId('header-logo');
        expect(logo).toBeTruthy();
    });
});

