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

// Import the RecipeProvider context
import { RecipeProvider } from './contexts/RecipeContext';

// Create the root of the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app wrapped in both BrowserRouter and RecipeProvider
root.render(
  <BrowserRouter>
    <RecipeProvider>
      <App />
    </RecipeProvider>
  </BrowserRouter>
);

reportWebVitals();