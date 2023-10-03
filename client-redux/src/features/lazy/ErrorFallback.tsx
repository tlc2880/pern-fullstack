import React from 'react';
type ErrorFallbackProp = {
  error: any;
  resetErrorBoundary: any
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProp) => {
  return (
      <div className="error">
          <p>Something went wrong:</p>
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
      </div>
  )
}
export default ErrorFallback