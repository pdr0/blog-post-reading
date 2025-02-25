import { renderHook } from '@testing-library/react-hooks';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

jest.mock('@/hooks/useColorScheme', () => ({
  useColorScheme: jest.fn(),
}));

describe('useThemeColor', () => {
  it('returns the light theme color when theme is light', () => {
    (useColorScheme as jest.Mock).mockReturnValue('light');

    const { result } = renderHook(() =>
        useThemeColor({ light: 'red', dark: 'blue' }, 'background')
    );

    expect(result.current).toBe('red');
  });

  it('returns the dark theme color when theme is dark', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');

    const { result } = renderHook(() =>
        useThemeColor({ light: 'red', dark: 'blue' }, 'background')
    );

    expect(result.current).toBe('blue');
  });

  it('returns default color from Colors when no props are provided', () => {
    (useColorScheme as jest.Mock).mockReturnValue('light');

    const { result } = renderHook(() =>
        useThemeColor({}, 'background')
    );

    expect(result.current).toBe(Colors.light.background);
  });

  it('returns dark mode default color from Colors when no props are provided', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');

    const { result } = renderHook(() =>
        useThemeColor({}, 'background')
    );

    expect(result.current).toBe(Colors.dark.background);
  });
});
