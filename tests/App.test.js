import React from 'react';
import { render, screen } from '@testing-library/react'; 
import App from '../src/App.js';

// Mock fetch or setup your mock API response
jest.mock('axios', () => ({
   get: jest.fn(() => Promise.resolve({ data: [] })) // Initial empty data 
}));

test('renders Hello Canada heading and Canada flag', async () => {   
  render(<App />);

  const headingElement = await screen.findByText('Hello Canada');
  expect(headingElement).toBeInTheDocument();

  const flagImage = screen.getByAltText("Canada's Flag");
  expect(flagImage).toBeInTheDocument();
});

test('fetches and renders provinces list when provinces option is selected', async () => {
  const mockProvinces = [
     { name: 'Ontario', capital: 'Toronto', flagUrl: '...' },
  ];

  jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: mockProvinces }))
  })); 

  render(<App />);

  const provincesMenuItem = screen.getByText('Provinces');
  userEvent.click(provincesMenuItem);

  // Wait for data to be fetched and rendered
  const firstProvinceItem = await screen.findByText('Ontario');
  expect(firstProvinceItem).toBeInTheDocument();
});