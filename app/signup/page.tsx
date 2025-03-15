'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const router = useRouter();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const validateForm = (): boolean => {
    setError(null);
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Use the signup function from AuthContext
      const success = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Account creation failed. Please try again.');
      }
      
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md card p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-md">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block mb-1 font-medium">First Name</label>
                <input 
                  id="firstName"
                  name="firstName"
                  type="text" 
                  placeholder="First name" 
                  className="input"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-1 font-medium">Last Name</label>
                <input 
                  id="lastName"
                  name="lastName"
                  type="text" 
                  placeholder="Last name" 
                  className="input" 
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email</label>
              <input 
                id="email"
                name="email"
                type="email" 
                placeholder="Enter your email" 
                className="input" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">Password</label>
              <input 
                id="password"
                name="password"
                type="password" 
                placeholder="Create a password" 
                className="input" 
                value={formData.password}
                onChange={handleChange}
              />
              <p className="mt-1 text-xs text-gray-400">
                Must be at least 6 characters
              </p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block mb-1 font-medium">Confirm Password</label>
              <input 
                id="confirmPassword"
                name="confirmPassword"
                type="password" 
                placeholder="Confirm your password" 
                className="input" 
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            
            <div className="flex items-center">
              <input 
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-sm">
                I agree to the{" "}
                <Link href="#" className="text-blue-400 hover:underline">
                  Terms of Service
                </Link>
              </label>
            </div>
            
            <button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg 
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    ></circle>
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <div className="mt-6">
            <p className="text-center text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}