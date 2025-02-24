import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemedView, ThemedViewProps } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

jest.mock('@/hooks/useThemeColor', () => ({
    useThemeColor: jest.fn(),
}));

describe('ThemedView Component', () => {
    it('applies the correct background color based on theme', () => {
        (useThemeColor as jest.Mock).mockReturnValueOnce('lightgray');
        const props: ThemedViewProps = {
            lightColor: 'white',
            darkColor: 'black',
            testID: 'themed-view',
        };

        const { getByTestId } = render(<ThemedView {...props} />);
        const themedView = getByTestId('themed-view');

        expect(themedView.props.style[0].backgroundColor).toBe('lightgray');
    });
});
