import React from 'react';
import Button from './Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 min-h-[300px] w-full">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-550 text-3xl mb-4">
            <i className="bx bx-error" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-sm text-gray-550 max-w-sm mb-6 leading-relaxed">
            An unexpected error occurred in rendering this view. Try reloading the page.
          </p>
          <Button
            variant="primary"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
