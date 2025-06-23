import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Alert, 
  InputGroup 
} from 'react-bootstrap';
import { FaUser, FaLock, FaUserShield } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/main');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = { username, password };
    
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      
      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem('authToken', response.data.token);
        
        // Store user data if provided
        if (response.data.user) {
          localStorage.setItem('userData', JSON.stringify(response.data.user));
        }
        
        // Redirect to main page using React Router
        navigate('/main');
      } else {
        setError('Login successful but no token received');
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 401) {
        setError('Invalid username or password');
      } else if (error.code === 'ECONNREFUSED') {
        setError('Unable to connect to server. Please try again later.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-overlay"></div>
      </div>
      
      <Container fluid className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
          <Col md={6} lg={4}>
            <Card className="login-card border-0 shadow">
              <Card.Body className="p-4">
                <div className="login-header text-center mb-4">
                  <div className="logo-container mb-3">
                    <div className="logo-circle">
                      <FaUserShield size={32} />
                    </div>
                  </div>
                  <h2 className="login-title">Welcome Back</h2>
                  <p className="login-subtitle">Sign in to your account</p>
                </div>

                {error && (
                  <Alert variant="danger" className="d-flex align-items-center">
                    <FaUserShield className="me-2" />
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} className="login-form" noValidate>
                  <Form.Group className="mb-3">
                    <InputGroup className="input-group">
                      <InputGroup.Text className="input-group-text">
                        <FaUser />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="User Name"
                        name="username"
                        id="login-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={loading}
                        autoComplete="username"
                        className="form-control"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <InputGroup className="input-group">
                      <InputGroup.Text className="input-group-text">
                        <FaLock />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="login-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        autoComplete="current-password"
                        className="form-control"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="primary"
                    className={`w-100 mb-3 login-btn ${loading ? 'loading' : ''}`}
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login; 