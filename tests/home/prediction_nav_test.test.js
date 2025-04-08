import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import HomePage from '../../app/home'

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

  it('should navigate to the Prediction page when the Prediction button is pressed', () => {
    // Render the HomePage with a mocked navigation object
    render(<HomePage navigation={{ navigate: mockNavigate }} />);

    // Find the "Settings" button by its text
    const settingsButton = screen.getByText(/Predictions/i);

    // Simulate pressing the "Settings" button
    fireEvent.press(settingsButton);

    // Assert that navigation.navigate was called with the correct route
    expect(mockNavigate).toHaveBeenCalledWith('Prediction');
  });
});