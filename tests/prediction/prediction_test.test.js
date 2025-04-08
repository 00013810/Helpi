import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import PredictionPage from '../../app/predictions/prediction'

// Mock `fetch` globally before running tests
global.fetch = jest.fn();

describe("PredictionPage Component", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clears mock data after each test
  });

  test("renders prediction data correctly", async () => {
    // Mock API response with fake data
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue([
        { name: "Item A", predictedQty: 50, accuracy: 95 },
        { name: "Item B", predictedQty: 30, accuracy: 90 },
      ]),
    });

    const { getByText } = render(<PredictionPage />);

    // Wait for API response to be loaded in the component
    await waitFor(() => {
      expect(getByText("Item A")).toBeTruthy();
      expect(getByText("50")).toBeTruthy();
      expect(getByText("95%")).toBeTruthy();
      expect(getByText("Item B")).toBeTruthy();
    });
  });

  test("shows error message when API fails", async () => {
    // Mock API failure
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const { getByText } = render(<PredictionPage />);

    // Wait for error message to appear
    await waitFor(() => {
      expect(getByText("Failed to load predictions")).toBeTruthy();
    });
  });
});
