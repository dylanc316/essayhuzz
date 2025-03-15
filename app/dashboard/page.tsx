'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

interface DocumentItem {
  id: string;
  title: string;
  type: 'pdf' | 'essay';
  date: string;
  status: 'analyzed' | 'draft';
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(true);

  // Check authentication and redirect if not logged in
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Fetch documents (mocked for now)
  useEffect(() => {
    if (isAuthenticated) {
      // Simulate API request delay
      const timer = setTimeout(() => {
        // Mock data
        const mockDocuments: DocumentItem[] = [
          {
            id: '1',
            title: 'Climate Change Analysis.pdf',
            type: 'pdf',
            date: '2025-03-10',
            status: 'analyzed'
          },
          {
            id: '2',
            title: 'Research Proposal',
            type: 'essay',
            date: '2025-03-05',
            status: 'draft'
          },
          {
            id: '3',
            title: 'Thesis Statement Draft',
            type: 'essay',
            date: '2025-02-28',
            status: 'draft'
          }
        ];
        
        setDocuments(mockDocuments);
        setIsLoadingDocuments(false);
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
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <h2 className="text-xl font-semibold mb-2">Analyze Document</h2>
            <p className="text-gray-400">Upload and analyze a PDF document</p>
          </Link>
          
          <Link href="/analyze?mode=write" className="card p-6 hover:bg-gray-700 transition cursor-pointer">
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
              />
            </svg>
            <h2 className="text-xl font-semibold mb-2">Write Essay</h2>
            <p className="text-gray-400">Create and analyze a new essay</p>
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <h2 className="text-xl font-semibold mb-2">Quick Stats</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Documents Analyzed</span>
                <span>{documents.filter(d => d.status === 'analyzed').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Drafts</span>
                <span>{documents.filter(d => d.status === 'draft').length}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Documents</h2>
          
          {isLoadingDocuments ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : documents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-2 text-left">Document</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map(doc => (
                    <tr key={doc.id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <svg 
                            className="h-5 w-5 mr-2 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            {doc.type === 'pdf' ? (
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
                              />
                            ) : (
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                              />
                            )}
                          </svg>
                          <span>{doc.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400 capitalize">{doc.type}</td>
                      <td className="px-4 py-3 text-gray-400">{new Date(doc.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span 
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            doc.status === 'analyzed' 
                              ? 'bg-green-900/30 text-green-400' 
                              : 'bg-yellow-900/30 text-yellow-400'
                          }`}
                        >
                          {doc.status === 'analyzed' ? 'Analyzed' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          className="text-blue-400 hover:text-blue-300 transition mr-4"
                          title="View"
                        >
                          View
                        </button>
                        <button 
                          className="text-red-400 hover:text-red-300 transition"
                          title="Delete"
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
              <p className="text-gray-400 mb-4">You haven't created any documents yet.</p>
              <Link 
                href="/analyze" 
                className="btn-primary inline-block"
              >
                Upload Your First Document
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}