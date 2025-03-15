'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

interface AnalyzedWork {
  id: string;
  title: string;
  author: string;
  type: 'book' | 'play' | 'poem' | 'essay';
  date: string;
  lastAnalyzed: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [analyzedWorks, setAnalyzedWorks] = useState<AnalyzedWork[]>([]);

  // Check authentication and redirect if not logged in
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Fetch user data (mocked)
  useEffect(() => {
    if (isAuthenticated) {
      // Simulate API request delay
      const timer = setTimeout(() => {
        // In a real app, we would fetch the user's analyzed works from an API
        // This is mock data for demonstration
        
        setAnalyzedWorks([]);  // Start with empty array for new users
        setIsLoadingData(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p>Loading dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user?.name}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/analyze" className="card p-6 hover:bg-gray-700 transition cursor-pointer">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 mb-4 text-blue-500" 
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
            <h2 className="text-xl font-semibold mb-2">Essay Helper</h2>
            <p className="text-gray-400">Get help with essays, quotations, and analysis</p>
          </Link>
          
          <Link href="/analyze?tab=character" className="card p-6 hover:bg-gray-700 transition cursor-pointer">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 mb-4 text-blue-500" 
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
            <h2 className="text-xl font-semibold mb-2">Character Analysis</h2>
            <p className="text-gray-400">Deep dive into character traits, development, and symbolism</p>
          </Link>
          
          <div className="card p-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 mb-4 text-blue-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
              />
            </svg>
            <h2 className="text-xl font-semibold mb-2">Usage Stats</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Works Analyzed</span>
                <span>{analyzedWorks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Analysis Credits</span>
                <span>Unlimited (Beta)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Account Type</span>
                <span>Beta Tester</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-700 rounded-md">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-1">Upload Your Text</h3>
                  <p className="text-gray-400 mb-2">Start by uploading a PDF of your book, play, or essay for analysis.</p>
                  <Link 
                    href="/analyze" 
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Go to Analysis →
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-700 rounded-md">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-1">Choose Your Analysis</h3>
                  <p className="text-gray-400 mb-2">Select essay help, character analysis, or explore themes in your text.</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-700 rounded-md">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-1">Get AI-Safe Results</h3>
                  <p className="text-gray-400 mb-2">Receive analysis that passes AI checkers while providing accurate insights.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Recently Analyzed Works</h2>
          
          {isLoadingData ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : analyzedWorks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Author</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Last Analyzed</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {analyzedWorks.map(work => (
                    <tr key={work.id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="px-4 py-3 font-medium">{work.title}</td>
                      <td className="px-4 py-3 text-gray-400">{work.author}</td>
                      <td className="px-4 py-3 text-gray-400 capitalize">{work.type}</td>
                      <td className="px-4 py-3 text-gray-400">{new Date(work.lastAnalyzed).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          className="text-blue-400 hover:text-blue-300 transition mr-4"
                        >
                          View
                        </button>
                        <button 
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 mx-auto mb-4 text-gray-700" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                />
              </svg>
              <p className="text-gray-400 mb-4">You haven't analyzed any works yet.</p>
              <Link 
                href="/analyze" 
                className="btn-primary inline-block"
              >
                Analyze Your First Work
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}