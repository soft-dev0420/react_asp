import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders login title', () => {
  render(<Login />);
  expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
}); 