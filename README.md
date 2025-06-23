# DexMachine App

A modern React application for managing DEX (Data Exchange) machine operations with a clean, professional interface. Features authentication, machine data configuration, API integration, and real-time system monitoring.

## Features

- **Modern Login System**: Clean, responsive login interface with light blue/white design
- **Authentication System**: JWT token-based authentication with automatic token management
- **Machine Data Management**: Configure and send data to Machine A and Machine B
- **Real-time Connection Testing**: Test API connectivity with detailed response information
- **Response History**: Track and view recent machine operations and responses
- **URL-Based Routing**: Proper URL paths with React Router (`/login`, `/main`)
- **Main Dashboard**: Comprehensive dashboard with user info and machine controls
- **Bootstrap Integration**: Uses Bootstrap 5 for responsive design and modern UI components
- **Font Awesome Icons**: Professional icons throughout the interface
- **Outlined Buttons**: Consistent outlined button style with blue accent (#3b82f6)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **API Integration**: Configured axios instance with automatic token handling
- **Component Tests**: All main components have basic tests for reliability

## URL Routing

### Available Routes
- **`/login`** - Login page (redirects to `/main` if already authenticated)
- **`/main`** - Main dashboard (protected route, requires authentication)
- **`/`** - Root route (redirects to `/login` or `/main` based on authentication status)
- **`/*`** - Catch-all route (redirects to `/login`)

### Authentication Flow
1. **Unauthenticated User**: Automatically redirected to `/login`
2. **Successful Login**: Redirected to `/main`
3. **Protected Routes**: Accessing `/main` without authentication redirects to `/login`
4. **Logout**: Clears token and redirects to `/login`

## Core Functionality

### Machine Data Operations
- **Machine A & B Configuration**: Edit and manage machine data through text areas
- **Send Operations**: Send configured data to respective machines via API
- **Reset to Default**: Restore original machine data configurations
- **Real-time Status**: View operation status, response times, and success/error messages

### Connection Testing
- **API Connectivity**: Test connection to backend services
- **Response Monitoring**: View detailed response information including status codes and timing
- **Error Handling**: Comprehensive error reporting and display

### Response History
- **Activity Tracking**: Maintain history of recent operations
- **Success/Error Indicators**: Visual status indicators for each operation
- **Detailed Logs**: Expandable accordion view of operation details
- **Timestamp Tracking**: Record and display operation timestamps

## Authentication Flow

1. **Login**: User enters username and password at `/login`
2. **Token Storage**: JWT token is stored in localStorage upon successful login
3. **Automatic Redirect**: User is redirected to `/main` dashboard
4. **Token Management**: All API requests automatically include the authentication token
5. **Token Validation**: Invalid/expired tokens automatically redirect to `/login`
6. **Logout**: Clears token and redirects to `/login`

## API Integration

### Backend Requirements
The app expects a backend API running on `http://localhost:5000` with the following endpoints:

#### Authentication
- `POST /login` - User login (returns JWT token)

#### Machine Operations
- `POST /vdi-dex?machine=A` - Send data to Machine A
- `POST /vdi-dex?machine=B` - Send data to Machine B
- `GET /test` - Test API connectivity

### Authentication Headers
All API requests include:
```
Authorization: Basic <base64_encoded_credentials>
Content-Type: text/plain
```

### Expected Response Format
```json
{
  "token": "jwt_token_here",
  "user": {
    "username": "user123",
    "email": "user@example.com"
  }
}
```

## Design Features

- **Light Blue/White Background**: Subtle blue gradient background for a modern, clean look
- **Outlined Buttons**: Consistent blue-accented outlined buttons for all main actions
- **Blue Accent Color**: #3b82f6 used for highlights, icons, and active states
- **Card-based Layout**: Clean, organized card layout for different sections
- **Status Indicators**: Visual indicators for operation success/failure
- **Modern Typography**: Clean, readable fonts with proper hierarchy
- **Accessibility**: Proper form labels, focus indicators, and semantic HTML
- **Loading States**: Spinner animations during API calls
- **Error Handling**: User-friendly error messages with dismissible alerts

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- Backend API server running on `http://localhost:5000`

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dexmachineapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Environment Setup
Ensure your backend API is running and accessible at `http://localhost:5000` with the required endpoints.

## Technologies Used

- **Frontend Framework**: React 19.1.0
- **Routing**: React Router 6.8.1
- **UI Framework**: Bootstrap 5.3.0 (CDN)
- **Icons**: Font Awesome 6.4.0 (CDN)
- **HTTP Client**: Axios
- **Styling**: CSS3 with modern features (flexbox, gradients, animations)
- **Testing**: Jest & React Testing Library

## Project Structure

```
src/
├── components/
│   ├── Login.js              # Login component with authentication
│   ├── Login.css             # Login page styles
│   ├── Login.test.js         # Login component test
│   ├── MainPage.js           # Main dashboard component
│   ├── MainPage.css          # Main page styles
│   ├── MainPage.test.js      # MainPage component test
│   ├── ProtectedRoute.js     # Route protection component
│   └── ProtectedRoute.test.js # ProtectedRoute test
├── data/
│   ├── dexMachineA.js        # Default Machine A data
│   └── dexMachineB.js        # Default Machine B data
├── utils/
│   ├── axiosConfig.js        # Axios configuration with auth
│   └── apiService.js         # Organized API service functions
├── App.js                    # Main app component with routing
├── App.css                   # App-level styles
├── App.test.js               # App-level test
└── index.js                  # App entry point
```

## Testing

Basic tests are provided for all main components using Jest and React Testing Library.

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### What is tested?
- **App**: Renders the DexMachine App title
- **Login**: Renders the login welcome title
- **MainPage**: Renders the main welcome message
- **ProtectedRoute**: Renders without crashing

## Usage Examples

### Machine Operations
```javascript
// Send data to Machine A
const response = await fetch('http://localhost:5000/vdi-dex?machine=A', {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
    'Authorization': 'Basic ' + btoa('vendsys:NFsZGmHAGWJSZ#RuvdiV'),
  },
  body: machineAData,
});

// Test connection
const testResponse = await fetch('http://localhost:5000/test', {
  headers: {
    'Content-Type': 'text/plain',
  },
});
```

### Navigation with React Router
```javascript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navigate to main page after login
navigate('/main');

// Navigate to login page on logout
navigate('/login');
```

### Authentication State Management
```javascript
// Check if user is authenticated
const token = localStorage.getItem('authToken');
const isAuthenticated = !!token;

// Clear authentication
localStorage.removeItem('authToken');
localStorage.removeItem('userData');
```

## URL Examples

- **Login Page**: `http://localhost:3000/login`
- **Main Dashboard**: `http://localhost:3000/main`
- **Root Redirect**: `http://localhost:3000/` (redirects based on auth status)

## Customization

The app can be easily customized by modifying:

### Styling
- **Color scheme**: Update colors in CSS files
- **Button styles**: Modify button variants and colors
- **Layout**: Adjust card layouts and spacing
- **Typography**: Change fonts and text styles

### Functionality
- **API endpoints**: Modify base URL in `axiosConfig.js`
- **Authentication flow**: Customize token handling logic
- **Machine data**: Update default data in `data/` folder
- **UI components**: Add new features and pages
- **Routes**: Add new protected routes in `App.js`

### Configuration
- **Backend URL**: Change API base URL
- **Authentication**: Modify auth headers and token handling
- **Machine operations**: Add new machine types or operations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

The app uses modern CSS features like gradients and flexbox which may not be supported in older browsers.

## Security Features

- **JWT Token Storage**: Secure token storage in localStorage
- **Automatic Token Injection**: All API requests include authentication
- **Token Validation**: Automatic redirect on invalid tokens
- **Error Handling**: Graceful handling of authentication errors
- **Logout Functionality**: Proper token cleanup on logout
- **Protected Routes**: URL-based route protection
- **Redirect Logic**: Proper handling of authentication state in URLs
- **Input Validation**: Form validation and sanitization

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Ensure backend server is running on `http://localhost:5000`
   - Check authentication credentials
   - Verify API endpoints are accessible

2. **Authentication Issues**
   - Clear browser localStorage
   - Check token expiration
   - Verify login credentials

3. **Component Rendering Issues**
   - Run `npm test` to check for test failures
   - Check browser console for errors
   - Verify all dependencies are installed

### Development Tips

- Use browser developer tools to monitor API requests
- Check the Network tab for failed requests
- Use React Developer Tools for component debugging
- Monitor localStorage for authentication state

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 