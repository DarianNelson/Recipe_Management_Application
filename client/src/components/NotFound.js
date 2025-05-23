import React from 'react';
import { Link } from 'react-router-dom';

// A simple 404 error page for when no matching route is found
function NotFound() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">404 - Page Not Found</h1>
      <p className="lead">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-outline-primary mt-3">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;