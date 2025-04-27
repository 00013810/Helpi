import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import HomePage from '../../app/home/home';
import { LanguageProvider } from '../../app/language_support/LanguageContext'; // ✅ Don't forget!

// Full manual mock for AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock @expo/vector-icons to prevent font-loading errors
jest.mock('@expo/vector-icons/FontAwesome', () => {
  return ({ name }) => `MockedIcon(${name})`;
});

describe('HomePage Component', () => {
  const mockNavigate = jest.fn(); // ✅ correct mock function

  beforeEach(() => {
    mockNavigate.mockClear(); // ✅ clear before each test
  });

  const renderHomePage = () => {
    return render(
      <LanguageProvider>
        <HomePage navigation={{ navigate: mockNavigate }} />
      </LanguageProvider>
    );
  };

  it('should navigate to the Monetization page when the Monetization button is pressed', () => {
    renderHomePage(); 
    const monetizationButton = screen.getByText(/Monetization/i); 

    fireEvent.press(monetizationButton); 

    expect(mockNavigate).toHaveBeenCalledWith('Monetization'); 
  });
});
