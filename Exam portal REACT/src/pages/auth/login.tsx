import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/auth/auth-form';
import { useAuthStore } from '../../store/auth';

export function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = (data: any) => {
    // In a real app, this would make an API call
    login({
      id: '1',
      name: data.email.split('@')[0],
      email: data.email,
      role: 'student',
    });
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Sign In</h1>
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
}