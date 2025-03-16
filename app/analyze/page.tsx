'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AppLayout from '../components/layout/AppLayout';
import EssayHelper from '../components/EssayHelper';
import CharacterAnalysis from '../components/CharacterAnalysis';

type AnalysisTab = 'essay' | 'character' | 'themes';

// This component uses useSearchParams which needs to be in a client component and wrapped in Suspense
function AnalyzeContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<AnalysisTab>('essay');
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  
  // Set the active tab based on URL parameter
  useEffect(() => {
    if (tabParam === 'character') {
      setActiveTab('character');
    } else if (tabParam === 'themes') {
      setActiveTab('themes');
    } else {
      setActiveTab('essay');
    }
  }, [tabParam]);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setFileUrl(URL.createObjectURL(selectedFile));
      } else {
        alert('Please upload a PDF file');
      }
    }
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'essay':
        return <EssayHelper />;
      case 'character':
        return <CharacterAnalysis />;
      case 'themes':
        return (
          <div className="card p-6 text-center py-16">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 mx-auto mb-4 text-blue-500 opacity-70" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
              />
            </svg>
            <h2 className="text-2xl font-bold mb-4">Theme Analysis</h2>
            <p className="text-lg text-gray-400 mb-6">Theme analysis feature coming soon!</p>
            <p className="max-w-md mx-auto text-gray-500">
              Our team is working on advanced theme detection and analysis capabilities. 
              This feature will be available in the next update.
            </p>
            <div className="mt-8">
              <button 
                onClick={() => setActiveTab('essay')}
                className="btn-primary"
              >
                Try Essay Helper Instead
              </button>
            </div>
          </div>
        );
      default:
        return <EssayHelper />;
    }
  };
  
  return (
    <div className="flex flex-col h-full space-y-6">
      {file && (
        <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg border border-gray-700">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-blue-400" 
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
          <div className="flex-1">
            <p className="font-medium truncate">{file.name}</p>
            <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => window.open(fileUrl as string, '_blank')}
              className="text-sm text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-md hover:bg-gray-700"
            >
              View
            </button>
            <button 
              onClick={() => {
                if (fileUrl) URL.revokeObjectURL(fileUrl);
                setFile(null);
                setFileUrl(null);
              }}
              className="text-sm text-red-400 hover:text-red-300 px-3 py-1.5 rounded-md hover:bg-gray-700"
            >
              Remove
            </button>
          </div>
        </div>
      )}
      
      {!file && (
        <div className="flex items-center justify-center p-4 bg-gray-800 rounded-lg border border-gray-700 border-dashed cursor-pointer hover:bg-gray-750" onClick={() => document.getElementById('file-upload')?.click()}>
          <input 
            id="file-upload"
            type="file" 
            accept=".pdf" 
            className="hidden" 
            onChange={handleFileUpload}
          />
          <div className="text-center p-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 mx-auto mb-3 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
            <p className="font-medium">Upload PDF (Optional)</p>
            <p className="text-sm text-gray-500 mt-1">Drag & drop or click to browse</p>
          </div>
        </div>
      )}
      
      <div className="flex border-b border-gray-800 mb-6">
        <button
          onClick={() => setActiveTab('essay')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition ${
            activeTab === 'essay'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          Essay Helper
        </button>
        <button
          onClick={() => setActiveTab('character')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition ${
            activeTab === 'character'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          Character Analysis
        </button>
        <button
          onClick={() => setActiveTab('themes')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition ${
            activeTab === 'themes'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          Theme Analysis
        </button>
      </div>
      
      {renderTabContent()}
    </div>
  );
}

// Main component that wraps the content in a Suspense boundary
export default function AnalyzePage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>}>
        <AnalyzeContent />
      </Suspense>
    </AppLayout>
  );
}