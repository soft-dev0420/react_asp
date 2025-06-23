import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      // Redirect to login if no token
      navigate('/login');
    }
  }, [navigate]);
  
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return null;
  }
  
  return children;
};

export default ProtectedRoute; 