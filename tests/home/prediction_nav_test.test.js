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
  return ({ name }) => `MockedIcon(${name})`;
});

describe('HomePage Component', () => {
  const mockNavigate = jest.fn(); 

  beforeEach(() => {
    mockNavigate.mockClear(); 
  });

  const renderHomePage = () => {
    return render(
      <LanguageProvider>
        <HomePage navigation={{ navigate: mockNavigate }} />
      </LanguageProvider>
    );
  };

  it('should navigate to the Prediction page when the Predictions button is pressed', () => {
    renderHomePage(); 

    // Find the "Predictions" button by its text
    const predictionsButton = screen.getByText(/Predictions/i); 

    fireEvent.press(predictionsButton); 

    // Assert that navigation.navigate was called with the correct route
    expect(mockNavigate).toHaveBeenCalledWith('Prediction');
  });
});
