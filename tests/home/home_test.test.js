import React from 'react';
import { render } from '@testing-library/react-native';
import HomePage from '../../app/home/home';
import { LanguageProvider } from '../../app/language_support/LanguageContext'; // 👈 import your provider

// Full manual mock for AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons/FontAwesome', () => {
  return ({ name }) => `MockedIcon(${name})`;
});

describe('HomePage Component', () => {
  test('renders HomePage and displays welcome message', () => {
    const mockNavigation = { navigate: jest.fn() };

    const { getByText } = render(
      <LanguageProvider> {/* 👈 Wrap it with your Language Context Provider */}
        <HomePage navigation={mockNavigation} />
      </LanguageProvider>
    );

    expect(getByText('Welcome to the Home Screen')).toBeTruthy();
  });
});
