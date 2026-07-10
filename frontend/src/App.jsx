import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { AllergenProvider } from './context/AllergenContext';
import { CompareProvider } from './context/CompareContext';
import AppRoutes from './routes';
import ErrorBoundary from './components/ui/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <BrowserRouter>
          <AuthProvider>
            <AllergenProvider>
              <CompareProvider>
                <AppRoutes />
              </CompareProvider>
            </AllergenProvider>
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
