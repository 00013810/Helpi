import React from 'react';
import { render } from '@testing-library/react-native';
import HomePage from '../../app/home';

// Mock @expo/vector-icons to prevent font-loading errors
jest.mock('@expo/vector-icons/FontAwesome', () => {
  return ({ name }) => {
    return `MockedIcon(${name})`; 
  };
});

describe('HomePage Component', () => {
  test('renders HomePage and displays welcome message', () => {
    const mockNavigation = { navigate: jest.fn() };

    const { getByText } = render(<HomePage navigation={mockNavigation} />);

    // Check if "Welcome to the Home Screen" is displayed
    expect(getByText('Welcome to the Home Screen')).toBeTruthy();
  });
});
