import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import AuthCard from '../../components/auth/AuthCard';
import LoginForm from '../../components/auth/LoginForm';

export const LoginPage = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center flex-1 py-12 select-none w-full">
        <AuthCard>
          <div className="text-center flex flex-col gap-1.5">
            <h1 className="text-2xl font-black text-gray-850">Welcome Back</h1>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Sign in to your NutriLens account</p>
          </div>
          
          <LoginForm />

          <div className="text-center text-xs text-gray-500 flex flex-col gap-2 mt-2 select-none">
            <Link to="/forgot-password" style={{ color: '#4caf50' }} className="hover:opacity-85 transition-opacity font-semibold">
              Forgot Password?
            </Link>
            <span>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: '#4caf50' }} className="font-extrabold hover:underline">
                Register
              </Link>
            </span>
          </div>
        </AuthCard>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
