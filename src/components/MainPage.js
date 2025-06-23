import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Spinner,
  Alert,
  Accordion,
  Form
} from 'react-bootstrap';
import {
  FaCube,
  FaUserCircle,
  FaSignOutAlt,
  FaRocket,
  FaDatabase,
  FaNetworkWired,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaServer,
  FaEdit,
} from 'react-icons/fa';
import { dexMachineA } from '../data/dexMachineA';
import { dexMachineB } from '../data/dexMachineB';
import './MainPage.css';

const MainPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [responseHistory, setResponseHistory] = useState([]);
  const [machineA, setMachineA] = useState(dexMachineA);
  const [machineB, setMachineB] = useState(dexMachineB);
  const [showMachineInputs, setShowMachineInputs] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
      // Redirect to login if no token
      navigate('/login');
      return;
    }

    // Get user data from localStorage if available
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const addToHistory = (action, response, success) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      action,
      response,
      success,
      type: success ? 'success' : 'error'
    };
    setResponseHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
  };

  const sendDex = async (machine, data) => {
    setActionLoading(true);
    setMessage('');
    setResponseData(null);

    try {
      const startTime = Date.now();
      const response = await fetch(`http://localhost:5000/vdi-dex?machine=${machine}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': 'Basic ' + btoa('vendsys:NFsZGmHAGWJSZ#RuvdiV'),
        },
        body: data,
      });

      const responseTime = Date.now() - startTime;
      const text = await response.text();

      const responseInfo = {
        machine,
        status: response.status,
        statusText: response.statusText,
        responseTime: `${responseTime}ms`,
        data: text,
        timestamp: new Date().toLocaleString(),
        headers: Object.fromEntries(response.headers.entries())
      };

      setResponseData(responseInfo);
      setMessage(`✅ Success: ${text}`);
      addToHistory(`Send Machine ${machine}`, text, true);
    } catch (error) {
      const errorInfo = {
        machine,
        error: error.message,
        timestamp: new Date().toLocaleString(),
        type: 'error'
      };
      setResponseData(errorInfo);
      setMessage(`❌ Error: ${error.message}`);
      addToHistory(`Send Machine ${machine}`, error.message, false);
    } finally {
      setActionLoading(false);
    }
  };

  const testConnection = async () => {
    setActionLoading(true);
    setMessage('');
    setResponseData(null);

    try {
      const startTime = Date.now();
      const response = await fetch('http://localhost:5000/test', {
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': 'Basic ' + btoa('vendsys:NFsZGmHAGWJSZ#RuvdiV'),
        },
      });

      const responseTime = Date.now() - startTime;
      const text = await response.text();

      const responseInfo = {
        type: 'connection_test',
        status: response.status,
        statusText: response.statusText,
        responseTime: `${responseTime}ms`,
        data: text,
        timestamp: new Date().toLocaleString(),
        headers: Object.fromEntries(response.headers.entries())
      };

      setResponseData(responseInfo);
      setMessage(`✅ Connection Test: ${text}`);
      addToHistory('Test Connection', text, true);
    } catch (error) {
      const errorInfo = {
        error: error.message,
        timestamp: new Date().toLocaleString(),
        type: 'error'
      };
      setResponseData(errorInfo);
      setMessage(`❌ Connection Error: ${error.message}`);
      addToHistory('Test Connection', error.message, false);
    } finally {
      setActionLoading(false);
    }
  };

  const resetToDefault = (machine) => {
    if (machine === 'A') {
      setMachineA(dexMachineA);
    } else {
      setMachineB(dexMachineB);
    }
  };

  if (loading) {
    return (
      <div className="main-loading">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="main-container">
      <Navbar bg="primary" variant="dark" expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="#" className="navbar-brand">
            <FaCube className="me-2" />
            DexMachine App
          </Navbar.Brand>

          <Nav className="ms-auto">
            <NavDropdown
              title={
                <span>
                  <FaUserCircle className="me-2" />
                  {userData?.username || 'User'}
                </span>
              }
              id="user-dropdown"
            >
              <NavDropdown.Item onClick={handleLogout}>
                <FaSignOutAlt className="me-2" />
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4 main-content-container">
        <Row>
          <Col lg={10} className="mx-auto">
            {/* Welcome Card */}
            <Card className="welcome-card border-0 shadow mb-4">
              <Card.Body className="p-4">
                <div className="welcome-header">
                  <h1>Welcome to DexMachine!</h1>
                  <p className="text-muted">Manage your DEX reports and monitor system status</p>
                </div>

                {/* Machine Data Input Section */}
                <Card className="machine-input-card border-0 shadow mb-4">
                  <Card.Header className="bg-light border-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">
                        <FaEdit className="me-2" />
                        Machine Data Configuration
                      </h5>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => setShowMachineInputs(!showMachineInputs)}
                      >
                        {showMachineInputs ? 'Hide Inputs' : 'Show Inputs'}
                      </Button>
                    </div>
                  </Card.Header>
                  {showMachineInputs && (
                    <Card.Body>
                      <Row>
                        <Col md={6} className="mb-3">
                          <Form.Group>
                            <Form.Label className="fw-bold">
                              <FaRocket className="me-2" />
                              Machine A Data
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={8}
                              value={machineA}
                              onChange={(e) => setMachineA(e.target.value)}
                              placeholder="Enter Machine A data..."
                              className="machine-input"
                            />
                            <div className="mt-2">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => resetToDefault('A')}
                              >
                                Reset to Default
                              </Button>
                            </div>
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                          <Form.Group>
                            <Form.Label className="fw-bold">
                              <FaDatabase className="me-2" />
                              Machine B Data
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={8}
                              value={machineB}
                              onChange={(e) => setMachineB(e.target.value)}
                              placeholder="Enter Machine B data..."
                              className="machine-input"
                            />
                            <div className="mt-2">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => resetToDefault('B')}
                              >
                                Reset to Default
                              </Button>
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  )}
                </Card>

                {/* Action Buttons */}
                <Row className="mb-4">
                  <Col md={6} className="mb-3">
                    <Button
                      variant="outline-primary"
                      size="lg"
                      className="action-btn w-100"
                      onClick={() => sendDex('A', machineA)}
                      disabled={actionLoading}
                    >
                      <FaRocket className="me-2" />
                      {actionLoading ? 'Processing...' : 'Send Machine A'}
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button
                      variant="outline-primary"
                      size="lg"
                      className="action-btn w-100"
                      onClick={() => sendDex('B', machineB)}
                      disabled={actionLoading}
                    >
                      <FaDatabase className="me-2" />
                      {actionLoading ? 'Processing...' : 'Send Machine B'}
                    </Button>
                  </Col>
                </Row>

                {/* Test Connection Button */}
                <Row className="mb-4">
                  <Col>
                    <Button
                      variant="outline-info"
                      size="lg"
                      className="action-btn w-100"
                      onClick={testConnection}
                      disabled={actionLoading}
                    >
                      <FaNetworkWired className="me-2" />
                      {actionLoading ? 'Testing...' : 'Test Connection'}
                    </Button>
                  </Col>
                </Row>

                {/* Message Display */}
                {message && (
                  <Alert
                    variant={message.includes('Error') ? 'danger' : 'success'}
                    className="message-alert"
                    dismissible
                    onClose={() => setMessage('')}
                  >
                    {message}
                  </Alert>
                )}

                {/* Response Data Display */}
                {responseData && (
                  <Card className="response-card border-0 shadow mt-4">
                    <Card.Header className="bg-light border-0">
                      <h5 className="mb-0">
                        <FaServer className="me-2" />
                        Response Details
                      </h5>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <div className="response-info">
                            <p><strong>Action:</strong> {responseData.machine ? `Send Machine ${responseData.machine}` : 'Connection Test'}</p>
                            <p><strong>Timestamp:</strong> {responseData.timestamp}</p>
                            {responseData.responseTime && (
                              <p><strong>Response Time:</strong> {responseData.responseTime}</p>
                            )}
                            {responseData.status && (
                              <p><strong>Status:</strong> {responseData.status} {responseData.statusText}</p>
                            )}
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="response-status">
                            {responseData.error ? (
                              <div className="text-danger">
                                <FaExclamationTriangle className="me-2" />
                                <strong>Error:</strong> {responseData.error}
                              </div>
                            ) : (
                              <div className="text-success">
                                <FaCheckCircle className="me-2" />
                                <strong>Success</strong>
                                <div className="mt-3">
                                  <h6>Response Data:</h6>
                                  <div className="response-data">
                                    <pre className="bg-light p-3 rounded">
                                      {responseData.data || responseData.error}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>

                      {/* Response Data */}

                    </Card.Body>
                  </Card>
                )}

                {/* Response History */}
                {responseHistory.length > 0 && (
                  <Card className="history-card border-0 shadow mt-4">
                    <Card.Header className="bg-light border-0">
                      <h5 className="mb-0">
                        <FaClock className="me-2" />
                        Recent Activity
                      </h5>
                    </Card.Header>
                    <Card.Body className="history-card-body">
                      <div className="history-scroll-container">
                        <Accordion>
                          {responseHistory.map((entry, index) => (
                            <Accordion.Item key={entry.id} eventKey={index.toString()}>
                              <Accordion.Header>
                                <div className="d-flex align-items-center w-100">
                                  <div className={`status-indicator ${entry.type}`}></div>
                                  <span className="ms-2">{entry.action}</span>
                                  <small className="text-muted ms-auto">{entry.timestamp}</small>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                <div className="history-entry">
                                  <Row>
                                    <Col md={3}><p className="text-muted bg-light rounded"><strong>Response:</strong></p></Col>
                                    <Col md={9}><pre className="bg-light p-2 rounded">
                                      {entry.response}
                                    </pre></Col>
                                  </Row>
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          ))}
                        </Accordion>
                      </div>
                    </Card.Body>
                  </Card>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainPage;