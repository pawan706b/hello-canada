import React from 'react';
import { render, screen } from '@testing-library/react'; 
import List from '../src/components/list.js';

test('renders correct number of Item components', () => {
    const sampleData = [
      { name: 'Alberta', capital: 'Edmonton', flagUrl: '...' },
      { name: 'Quebec', capital: 'Quebec City', flagUrl: '...' }
    ];
  
    render(<List data={sampleData} />);
  
    // Assumes you identify Item components by some unique content
    const itemComponents = screen.getAllByText(/Alberta|Quebec/i);
    expect(itemComponents.length).toBe(2);
  });