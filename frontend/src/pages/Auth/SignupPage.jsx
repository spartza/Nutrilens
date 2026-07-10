import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import AuthCard from '../../components/auth/AuthCard';
import SignupForm from '../../components/auth/SignupForm';

export const SignupPage = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center flex-1 py-12 select-none w-full">
        <AuthCard>
          <div className="text-center flex flex-col gap-1.5">
            <h1 className="text-2xl font-black text-gray-850">Create Account</h1>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Join NutriLens to analyze food additives</p>
          </div>
          
          <SignupForm />

          <div className="text-center text-xs text-gray-500 mt-2 select-none">
            <span>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#4caf50' }} className="font-extrabold hover:underline">
                Sign In
              </Link>
            </span>
          </div>
        </AuthCard>
      </div>
    </PageWrapper>
  );
};

export default SignupPage;
