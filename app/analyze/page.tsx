'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PDFUploader from '../components/PDFUploader';
import PDFViewer from '../components/PDFViewer';
import DropdownAnalysis from '../components/DropdownAnalysis';

export default function AnalyzePage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Handle file upload
  const handleFileUpload = (file: File) => {
    setPdfFile(file);
    const fileUrl = URL.createObjectURL(file);
    setPdfUrl(fileUrl);
  };

  // Clear uploaded PDF
  const handleClear = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    setPdfFile(null);
    setPdfUrl(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">AI Essay Analysis</h1>
        
        {!pdfFile ? (
          <div className="max-w-2xl mx-auto">
            <PDFUploader onFileUpload={handleFileUpload} />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left sidebar with analysis options */}
            <div className="w-full md:w-1/3 space-y-4">
              <button 
                onClick={handleClear}
                className="mb-4 px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition"
              >
                Upload Different File
              </button>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Analysis Tools</h2>
                
                <DropdownAnalysis 
                  title="Summary" 
                  description="Get a concise summary of the document"
                  isLoading={isAnalyzing}
                  pdfFile={pdfFile}
                />
                
                <DropdownAnalysis 
                  title="Key Points" 
                  description="Extract the main arguments and key points"
                  isLoading={isAnalyzing}
                  pdfFile={pdfFile}
                />
                
                <DropdownAnalysis 
                  title="Critical Analysis" 
                  description="Evaluate the strength of arguments and evidence"
                  isLoading={isAnalyzing}
                  pdfFile={pdfFile}
                />
              </div>
            </div>
            
            {/* PDF Viewer */}
            <div className="w-full md:w-2/3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold mb-4">
                  {pdfFile?.name || 'Document Viewer'}
                </h2>
                <PDFViewer pdfUrl={pdfUrl} />
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}