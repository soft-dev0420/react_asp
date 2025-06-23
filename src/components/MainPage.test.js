import { render, screen } from '@testing-library/react';
import MainPage from './MainPage';

// Mock react-router-dom's useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('renders DexMachine welcome', () => {
  render(<MainPage />);
  expect(screen.getByText(/Welcome to DexMachine/i)).toBeInTheDocument();
}); 