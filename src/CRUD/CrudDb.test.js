import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CrudDb from './CrudDb';

test('renders required elements with correct classes and text content', () => {
  render(<CrudDb/>);

  expect(screen.getByText('GRIP BANK')).toBeInTheDocument();
  expect(screen.getByText('Customer Details')).toBeInTheDocument();

 
  expect(screen.getByText('GRIP BANK')).toHaveClass('header');
  expect(screen.getByText('Customer Details')).toHaveClass('card-title');
})

// test('toggle button text based on editingPost state', () => {
//   const handleSaveClick = jest.fn();
//   render(<CrudDb editingPost={false} handleSaveClick={handleSaveClick} />);
  
//   const buttonElement = screen.getByRole('button');
//   expect(buttonElement).toHaveTextContent('Add Post');
//   render(<CrudDb editingPost={true} handleSaveClick={handleSaveClick} />);
  
 
//   expect(buttonElement).toHaveTextContent('Update Post');
// });