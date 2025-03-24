'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-400">
                EssayHuzz
              </Link>
              <div className="ml-10 flex items-center space-x-6">
                <Link href="/browse" className="text-gray-300 hover:text-white">
                  Browse
                </Link>
                <Link href="/write" className="text-gray-300 hover:text-white">
                  Write
                </Link>
                <Link href="/analyze" className="text-gray-300 hover:text-white">
                  Analyze
                </Link>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="text-gray-300 hover:text-white px-3 py-2"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} EssayHuzz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 