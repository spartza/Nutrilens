import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validateRegister } from '../../utils/validateForm';
import Input from '../ui/Input';
import Button from '../ui/Button';

export const SignupForm = () => {
  const { signup, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateRegister(name, email, password);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    try {
      await signup(name, email, password);
      // Auto navigate to login page on successful account creation
      navigate('/login');
    } catch (err) {
      // Handled by toast notifications in useAuth
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        icon={<i className="bx bx-user" />}
      />

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
        label="Password (min. 6 characters)"
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
        {loading ? 'Registering...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default SignupForm;
