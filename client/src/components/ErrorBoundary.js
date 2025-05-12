import React from 'react';

// A component to catch and handle errors in child components
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Update state if an error is thrown
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Log the error details
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  // Render fallback UI if an error occurred, otherwise render children
  render() {
    if (this.state.hasError) {
      return (
        <div className="container text-center mt-5">
          <h2>Something went wrong.</h2>
          <p>Please try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;