import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="container py-4">
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </div>
  </StrictMode>
);
