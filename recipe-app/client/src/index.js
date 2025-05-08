// Import core React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import main app component and global styles
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import React Router for routing
import { BrowserRouter } from 'react-router-dom';

// Create the root of the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app wrapped in BrowserRouter for routing support
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Optional: measure performance of your app
reportWebVitals();