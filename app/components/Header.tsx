'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    // No need for router.push as the AuthContext will handle redirects
  };

  return (
    <header className="border-b border-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          EssayHuzz
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/dashboard" 
            className={`hover:text-blue-400 transition ${
              isActive('/dashboard') ? 'text-blue-400 font-medium' : ''
            }`}
          >
            Dashboard
          </Link>
          
          <Link 
            href="/analyze" 
            className={`hover:text-blue-400 transition ${
              isActive('/analyze') ? 'text-blue-400 font-medium' : ''
            }`}
          >
            Analyze
          </Link>
          
          <Link 
            href="/about" 
            className={`hover:text-blue-400 transition ${
              isActive('/about') ? 'text-blue-400 font-medium' : ''
            }`}
          >
            About
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden py-3 px-4 border-t border-gray-800">
          <nav className="flex flex-col space-y-3">
            <Link 
              href="/dashboard" 
              className={`py-2 ${
                isActive('/dashboard') ? 'text-blue-400 font-medium' : ''
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            
            <Link 
              href="/analyze" 
              className={`py-2 ${
                isActive('/analyze') ? 'text-blue-400 font-medium' : ''
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Analyze
            </Link>
            
            <Link 
              href="/about" 
              className={`py-2 ${
                isActive('/about') ? 'text-blue-400 font-medium' : ''
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            
            {isAuthenticated ? (
              <>
                <span className="py-2 text-gray-400">
                  {user?.name}
                </span>
                <button
                  onClick={async () => {
                    await handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 text-blue-400 font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="py-2 text-blue-400 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}