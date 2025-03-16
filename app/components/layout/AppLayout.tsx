'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Auto-hide sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) {
          setIsSidebarOpen(false);
        } else {
          setIsSidebarOpen(true);
        }
      }
    };

    // Set initial state
    handleResize();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isMobileMenuOpen ? 'translate-x-0' : ''} md:relative md:translate-x-0 border-r border-gray-800`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-800">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">EssayHuzz</span>
            </Link>
          </div>

          {/* User info */}
          {isAuthenticated ? (
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-lg font-semibold">{user?.name?.[0] || 'U'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 border-b border-gray-800">
              <Link href="/login" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center block font-medium">
                Sign In
              </Link>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <Link
              href="/dashboard"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive('/dashboard') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </Link>

            <Link
              href="/analyze"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive('/analyze') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Essay Helper
            </Link>

            <Link
              href="/analyze?tab=character"
              className={`flex items-center px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Character Analysis
            </Link>

            <Link
              href="/analyze?tab=themes"
              className={`flex items-center px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
              Theme Analysis
            </Link>
            
            <div className="pt-4 border-t border-gray-800 mt-4">
              <Link
                href="/about"
                className={`flex items-center px-3 py-2 rounded-md ${
                  isActive('/about') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                About
              </Link>
            </div>
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-gray-800">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            ) : (
              <Link
                href="/signup"
                className="flex items-center w-full px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Create Account
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop header */}
        <header className="bg-gray-900 border-b border-gray-800 py-4 px-6 hidden md:flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white"
            aria-label="Toggle sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isSidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              )}
            </svg>
          </button>

          <div className="text-xl font-semibold">
            {pathname === '/dashboard' && 'Dashboard'}
            {pathname === '/analyze' && 'Essay Helper'}
            {pathname === '/about' && 'About Us'}
            {pathname.startsWith('/analyze') && pathname.includes('character') && 'Character Analysis'}
            {pathname.startsWith('/analyze') && pathname.includes('themes') && 'Theme Analysis'}
          </div>

          {/* Right side actions/info */}
          <div>
            {isAuthenticated ? (
              <div className="text-sm text-gray-400">
                Beta Access
              </div>
            ) : (
              <Link href="/login" className="text-blue-400 hover:text-blue-300">
                Sign In
              </Link>
            )}
          </div>
        </header>

        {/* Mobile header - only shown when sidebar is closed */}
        <header className={`bg-gray-900 border-b border-gray-800 py-4 px-6 md:hidden flex items-center justify-between ${isMobileMenuOpen ? 'hidden' : ''}`}>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>

          <Link href="/" className="text-xl font-bold">
            EssayHuzz
          </Link>

          {/* Right side actions/info */}
          <div>
            {isAuthenticated ? (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-sm font-semibold">{user?.name?.[0] || 'U'}</span>
              </div>
            ) : (
              <Link href="/login" className="text-blue-400 hover:text-blue-300">
                Sign In
              </Link>
            )}
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-auto bg-gray-900 pt-6">
          <div className="container mx-auto px-4 pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}