import { render, screen } from '@testing-library/react';
import App from './App';
import MainPage from './MainPage';

test('renders DexMachine App title', () => {
  render(<App />);
  const titleElement = screen.getByText(/DexMachine App/i);
  expect(titleElement).toBeInTheDocument();
});

// Mock react-router-dom's useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('renders DexMachine welcome', () => {
  render(<MainPage />);
  expect(screen.getByText(/Welcome to DexMachine/i)).toBeInTheDocument();
});
