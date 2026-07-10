import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import AuthCard from '../../components/auth/AuthCard';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { forgotPassword } from '../../api/auth.api';
import { useToast } from '../../hooks/useToast';
import { parseApiError } from '../../utils/parseApiError';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await forgotPassword(email.trim());
      setSubmitted(true);
      addToast(`Reset link successfully sent to ${email}! 📧`, 'success');
    } catch (err) {
      addToast(parseApiError(err), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center flex-1 py-12 select-none w-full">
        <AuthCard>
          <div className="text-center flex flex-col gap-1.5">
            <h1 className="text-2xl font-black text-gray-850">Reset Password</h1>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Request a password recovery email</p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<i className="bx bx-envelope" />}
                required
              />
              
              <Button type="submit" variant="primary" className="mt-2 w-full" disabled={loading}>
                {loading ? 'Sending link...' : 'Send Reset Link'}
              </Button>
            </form>
          ) : (
            <div className="text-center flex flex-col gap-4 py-4 select-none">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-2xl mx-auto shadow-inner">
                <i className="bx bx-check-circle" />
              </div>
              <p className="text-sm text-gray-650 leading-relaxed font-semibold">
                An email has been dispatched to <strong>{email}</strong> containing recovery instructions.
              </p>
            </div>
          )}

          <div className="text-center text-xs text-gray-500 mt-2 select-none">
            <Link to="/login" style={{ color: '#4caf50' }} className="font-extrabold hover:underline">
              Back to login
            </Link>
          </div>
        </AuthCard>
      </div>
    </PageWrapper>
  );
};

export default ForgotPasswordPage;
