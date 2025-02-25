import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/auth/auth-form';
import { useAuthStore } from '../../store/auth';

export function Register() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleRegister = (data: any) => {
    // In a real app, this would make an API call
    login({
      id: '1',
      name: data.name,
      email: data.email,
      role: data.role,
    });
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Create Account</h1>
      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  );
}