'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          EssayHuzz
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/analyze" 
            className={`hover:text-blue-600 dark:hover:text-blue-400 transition ${
              isActive('/analyze') ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
            }`}
          >
            Analyze
          </Link>
          
          <Link 
            href="/browse" 
            className={`hover:text-blue-600 dark:hover:text-blue-400 transition ${
              isActive('/browse') ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
            }`}
          >
            Browse
          </Link>
          
          <Link 
            href="/write" 
            className={`hover:text-blue-600 dark:hover:text-blue-400 transition ${
              isActive('/write') ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
            }`}
          >
            Write
          </Link>
          
          <Link 
            href="/about" 
            className={`hover:text-blue-600 dark:hover:text-blue-400 transition ${
              isActive('/about') ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
            }`}
          >
            About
          </Link>
          
          <Link 
            href="/login" 
            className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition"
          >
            Sign In
          </Link>
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
        <div className="md:hidden py-3 px-4 border-t border-gray-200 dark:border-gray-800">
          <nav className="flex flex-col space-y-3">
            <Link 
              href="/analyze" 
              className={`py-2 ${
                isActive('/analyze') ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Analyze
            </Link>
            
            <Link 
              href="/browse" 
              className={`py-2 ${
                isActive('/browse') ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse
            </Link>
            
            <Link 
              href="/write" 
              className={`py-2 ${
                isActive('/write') ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Write
            </Link>
            
            <Link 
              href="/about" 
              className={`py-2 ${
                isActive('/about') ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            
            <Link 
              href="/login" 
              className="py-2 text-blue-600 dark:text-blue-400 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}