import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders employee management interface', () => {
  render(<App />);
  // Test that the main component renders
  expect(document.querySelector('.employee-management')).toBeInTheDocument();
});

test('renders search functionality', () => {
  render(<App />);
  const searchLabel = screen.getByText('Buscar');
  expect(searchLabel).toBeInTheDocument();
});

test('renders employee table header', () => {
  render(<App />);
  const employeeHeader = screen.getByText('Empelado');
  const officeHeader = screen.getByText('Oficina');
  const emailHeader = screen.getByText('Correo electronico');
  const responsibleHeader = screen.getByText('Responsable');
  const actionHeader = screen.getByText('Acción');
  
  expect(employeeHeader).toBeInTheDocument();
  expect(officeHeader).toBeInTheDocument();
  expect(emailHeader).toBeInTheDocument();
  expect(responsibleHeader).toBeInTheDocument();
  expect(actionHeader).toBeInTheDocument();
});
