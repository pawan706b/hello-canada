import React from 'react';
import { render, screen } from '@testing-library/react'; 
import Item from '../src/components/item.js';
import userEvent from '@testing-library/user-event'; 

test('toggles display of capital', async () => {
    const province = { name: 'Saskatchewan', capital: 'Regina', flagUrl: '...' };
    render(<Item {...province} />);
  
    const button = screen.getByRole('button', {name: /show capital/i});
    userEvent.click(button);
  
    const capitalText = await screen.findByText('Regina');
    expect(capitalText).toBeInTheDocument();
  });
  
  test('changes button text after capital is toggled', async () => {
    const province = { name: 'Saskatchewan', capital: 'Regina', flagUrl: '...' };
    render(<Item {...province} />);
  
    // Find the button with the initial text
    let button = screen.getByRole('button', {name: /show capital/i}); 
    expect(button).toBeInTheDocument();
  
    // Click the button
    userEvent.click(button);
  
    // Find the button with the updated text
    button = await screen.findByRole('button', {name: /hide capital/i });
    expect(button).toBeInTheDocument();
  });
