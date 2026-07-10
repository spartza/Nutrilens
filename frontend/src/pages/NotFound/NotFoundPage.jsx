import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/ui/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center flex-1 text-center py-12 select-none animate-fade-in w-full">
        <i className="bx bx-compass text-6xl text-gray-300 mb-4 animate-pulse-slow" />
        <h1 className="text-3xl font-black text-gray-800 mb-2">Page Not Found</h1>
        <p className="text-sm text-gray-450 max-w-xs mb-6 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button variant="primary" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
      </div>
    </PageWrapper>
  );
};

export default NotFoundPage;
