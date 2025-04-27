import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import HomePage from '../../app/home/home';
import { LanguageProvider } from '../../app/language_support/LanguageContext'; 

// Full manual mock for AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock @expo/vector-icons to prevent font-loading errors
jest.mock('@expo/vector-icons/FontAwesome', () => {
    return ({ name }) => {
      return `MockedIcon(${name})`; 
    };
  });
  
describe('HomePage Component', () => {
  const mockNavigate = jest.fn(); // Mock the navigation.navigate function

  beforeEach(() => {
    mockNavigate.mockClear(); // Clear the mock before each test
  });

  const renderHomePage = () => {
    return render(
      <LanguageProvider>
        <HomePage navigation={{ navigate: mockNavigate }} />
      </LanguageProvider>
    );
  };

  it('should navigate to the Settings page when the Settings button is pressed', () => {
    // Render the HomePage with a mocked navigation object
    renderHomePage()

    // Find the "Settings" button by its text
    const settingsButton = screen.getByText(/Settings/i);

    // Simulate pressing the "Settings" button
    fireEvent.press(settingsButton);

    // Assert that navigation.navigate was called with the correct route
    expect(mockNavigate).toHaveBeenCalledWith('Settings');
  });
});