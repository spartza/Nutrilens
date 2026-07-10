import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { validateLogin } from '../../utils/validateForm';
import Input from '../ui/Input';
import Button from '../ui/Button';

export const LoginForm = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateLogin(email, password);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    try {
      await login(email, password);
    } catch (err) {
      // Handled by custom toast alerts in useAuth
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        icon={<i className="bx bx-envelope" />}
      />
      
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        icon={<i className="bx bx-lock-alt" />}
      />

      <Button
        type="submit"
        variant="primary"
        className="mt-2 w-full"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;
