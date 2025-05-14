import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password);
    } else {
      signup(email, password, username);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center"
      style={{ 
        backgroundImage: "url('https://plus.unsplash.com/premium_photo-1682092637891-d9979cc93f6e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwd2VkZGluZyUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Large Heading */}
      <h1
        className="relative z-10"
        style={{
          fontSize: '100px',
          fontFamily: 'Arial',
          textAlign: 'center',
          color: '#f56c09',
          textShadow: '4px 4px 6px rgba(255, 255, 255, 0.7)',
          marginBottom: '40px',
          letterSpacing: '1px',
          animation: 'fadeIn 2s ease-in-out',
        }}
      >
        AAHA KALYANAM
      </h1>

      {/* Login/Signup Form */}
      <div className="relative z-10 w-full max-w-md px-6 py-12 bg-white bg-opacity-95 rounded-lg shadow-xl">
        <div className="text-center mb-8">
          <p className="mt-2 text-gray-600">Your Perfect Wedding Planning Partner </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full"
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-secondary">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
