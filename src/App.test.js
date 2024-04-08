import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

const API_URL =
  "https://my-json-server.typicode.com/simonachkar/demo-canada-api-server";

test("renders App component", () => {
  render(<App />);

  const appElement = screen.getByText("Hello Canada");
  expect(appElement).toBeInTheDocument();
});


// Helper function to assist with API calls in tests
const fetchProvincesData = async () => {
    const response = await fetch(`${API_URL}/provinces`);
    return response.json();
  };
  
  const fetchTerritoriesData = async () => {
    const response = await fetch(`${API_URL}/territories`);
    return response.json();
  };
  
  // Test case 1: Renders App component and checks for "Hello Canada"
  test("renders App component and checks for 'Hello Canada'", async () => {
    render(<App />);
    const appElement = await screen.findByText("Hello Canada");
    expect(appElement).toBeInTheDocument();
  });
  
  // Test case 2: Fetches provinces data and verifies the first Province Name is Rendered
  test("fetches provinces data and verifies the first Province Name is Rendered", async () => {
    render(<App />);
    const provincesData = await fetchProvincesData();
    const firstProvinceName = provincesData[0].name;
    const provinceName = await screen.findByText(firstProvinceName);
    expect(provinceName).toBeInTheDocument();
  });
  
  // Test case 3: Fetches data and verifies the first Province Flag is Rendered
  test("fetches data and verifies the first Province Flag is Rendered", async () => {
    render(<App />);
    const provincesData = await fetchProvincesData();
    const firstProvinceFlagUrl = provincesData[0].flagUrl;
    await waitFor(() => {
      const flagImage = screen.getByAltText(`${provincesData[0].name}'s Flag`);
      expect(flagImage).toHaveAttribute('src', firstProvinceFlagUrl);
    });
  });
  
  // Test case 4: Fetches territories data and renders the first territory name correctly
  test("fetches territories data and renders the first territory name correctly", async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Territories'));
    const territoriesData = await fetchTerritoriesData();
    const firstTerritoryName = territoriesData[0].name;
    await waitFor(() => {
      expect(screen.getByText(firstTerritoryName)).toBeInTheDocument();
    });
  });
  
  // Test case 5: Verifies the capital name is shown after a button click for the first Province
  test("verifies the capital name is shown after a button click for the first Province", async () => {
    render(<App />);
    const provincesData = await fetchProvincesData();
    const firstProvinceCapital = provincesData[0].capital;
    fireEvent.click(screen.getByText('Provinces'));
    await waitFor(() => {
      const showCapitalButton = screen.getAllByText('Show Capital')[0];
      fireEvent.click(showCapitalButton);
      expect(screen.getByText(firstProvinceCapital)).toBeInTheDocument();
    });
  });
  