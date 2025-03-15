'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EssayHelper from '../components/EssayHelper';
import CharacterAnalysis from '../components/CharacterAnalysis';

type AnalysisTab = 'essay' | 'character' | 'themes';

export default function AnalyzePage() {
  const [activeTab, setActiveTab] = useState<AnalysisTab>('essay');
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  
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
  
  const handleClearFile = () => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    setFile(null);
    setFileUrl(null);
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'essay':
        return <EssayHelper />;
      case 'character':
        return <CharacterAnalysis />;
      case 'themes':
        return (
          <div className="card p-6 text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Theme Analysis</h2>
            <p className="text-lg text-gray-400 mb-6">Theme analysis feature coming soon!</p>
            <p className="text-gray-500">Our team is working on advanced theme detection and analysis capabilities.</p>
          </div>
        );
      default:
        return <EssayHelper />;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left sidebar with upload and tabs */}
          <div className="w-full lg:w-1/4 space-y-6">
            {!file ? (
              <div 
                className="border-2 border-dashed border-gray-700 hover:border-gray-600 rounded-lg p-6 cursor-pointer transition text-center"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-12 h-12 mx-auto mb-4 text-gray-500"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                
                <h3 className="mb-2 text-lg font-medium">
                  Upload PDF (Optional)
                </h3>
                
                <p className="mb-4 text-sm text-gray-400">
                  Upload a PDF of your text to analyze
                </p>
                
                <input 
                  id="file-upload"
                  type="file" 
                  accept=".pdf" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </div>
            ) : (
              <div className="card p-4">
                <h3 className="font-medium mb-2">Uploaded File</h3>
                <p className="text-sm text-gray-400 mb-3 truncate">{file.name}</p>
                <div className="flex justify-between">
                  <button 
                    onClick={() => window.open(fileUrl as string, '_blank')}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    View
                  </button>
                  <button 
                    onClick={handleClearFile}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
            
            <div className="card p-4">
              <h3 className="font-medium mb-3">Analysis Tools</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('essay')}
                  className={`w-full text-left px-3 py-2 rounded-md transition ${
                    activeTab === 'essay' 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-700'
                  }`}
                >
                  Essay Helper
                </button>
                <button 
                  onClick={() => setActiveTab('character')}
                  className={`w-full text-left px-3 py-2 rounded-md transition ${
                    activeTab === 'character' 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-700'
                  }`}
                >
                  Character Analysis
                </button>
                <button 
                  onClick={() => setActiveTab('themes')}
                  className={`w-full text-left px-3 py-2 rounded-md transition ${
                    activeTab === 'themes' 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-700'
                  }`}
                >
                  Theme Analysis
                </button>
              </div>
            </div>
            
            <div className="card p-4">
              <h3 className="font-medium mb-3">Tips</h3>
              <ul className="text-sm text-gray-400 space-y-2 list-disc pl-4">
                <li>Upload your text for more accurate quotations</li>
                <li>Be specific about character names and work titles</li>
                <li>For essay help, provide clear prompts</li>
                <li>All analysis is AI-detector safe</li>
              </ul>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="w-full lg:w-3/4">
            {renderTabContent()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}