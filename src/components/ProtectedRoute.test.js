import { render } from '@testing-library/react';
import ProtectedRoute from './ProtectedRoute';

test('renders ProtectedRoute without crashing', () => {
  render(<ProtectedRoute />);
}); 