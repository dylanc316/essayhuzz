'use client';

import { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

type AnalysisType = 'summary' | 'keyPoints' | 'criticalAnalysis' | 'none';

export default function AnalyzePage() {
  const { isAuthenticated } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisType, setAnalysisType] = useState<AnalysisType>('none');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [essayContent, setEssayContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setFileUrl(URL.createObjectURL(selectedFile));
        // Reset analysis data
        setAnalysisType('none');
        setAnalysisResult(null);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  // Clear uploaded PDF
  const handleClear = () => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    setFile(null);
    setFileUrl(null);
    setAnalysisType('none');
    setAnalysisResult(null);
    setEssayContent('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Perform analysis
  const handleAnalyze = async (type: AnalysisType) => {
    if (!file) return;
    
    setIsAnalyzing(true);
    setAnalysisType(type);
    
    try {
      // Mock API call for now - will be replaced with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let result = '';
      
      switch (type) {
        case 'summary':
          result = `# Summary\n\nThis document presents a comprehensive analysis of the topic at hand. The author effectively organizes the content into clear sections, beginning with an introduction that outlines the main thesis. The body paragraphs provide supporting evidence and analysis, with particular strength in the methodology section. The conclusion successfully ties together the key points and offers thoughtful insights for future research in this area.`;
          break;
          
        case 'keyPoints':
          result = `# Key Points\n\n- The document establishes a clear theoretical framework in the introduction
- Strong use of empirical evidence to support main arguments
- Effective comparison of competing viewpoints
- Thorough analysis of limitations in current research
- Well-structured conclusion that synthesizes findings
- Includes recommendations for practical applications`;
          break;
          
        case 'criticalAnalysis':
          result = `# Critical Analysis\n\nStrengths:\n- Clear organization and logical flow of ideas
- Strong use of evidence to support claims
- Effective integration of relevant scholarly sources
- Nuanced discussion of complex concepts\n\nAreas for Improvement:\n- Some arguments could benefit from additional supporting evidence
- The counterargument section could be expanded
- Consider addressing potential methodological limitations
- A few transitions between major sections could be smoother`;
          break;
          
        default:
          result = 'Please select a specific analysis type.';
      }
      
      setAnalysisResult(result);
      
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisResult('Error performing analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Toggle between analyze and write modes
  const toggleMode = (mode: 'analyze' | 'write') => {
    if (mode === 'analyze') {
      setIsWriting(false);
    } else {
      setIsWriting(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">{isWriting ? 'Write an Essay' : 'Analyze Document'}</h1>
          
          <div className="flex space-x-4">
            <button 
              onClick={() => toggleMode('analyze')}
              className={`px-4 py-2 rounded-md transition ${!isWriting ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              Analyze
            </button>
            
            <button 
              onClick={() => toggleMode('write')}
              className={`px-4 py-2 rounded-md transition ${isWriting ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              Write
            </button>
          </div>
        </div>
        
        {isWriting ? (
          <div className="card p-6">
            <div className="mb-4">
              <label className="block mb-2 font-medium">Title</label>
              <input 
                type="text" 
                placeholder="Enter essay title" 
                className="input"
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Content</label>
              <textarea 
                rows={15} 
                placeholder="Write your essay here..." 
                className="input font-mono"
                value={essayContent}
                onChange={(e) => setEssayContent(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <button className="btn-outline">
                Save Draft
              </button>
              <button className="btn-primary">
                Analyze Essay
              </button>
            </div>
          </div>
        ) : (
          <>
            {!file ? (
              <div className="max-w-2xl mx-auto">
                <div 
                  className="border-2 border-dashed border-gray-700 hover:border-gray-600 rounded-lg p-10 cursor-pointer transition text-center"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-16 h-16 mx-auto mb-4 text-gray-500"
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
                  
                  <h3 className="mb-2 text-xl font-medium">
                    Upload your PDF
                  </h3>
                  
                  <p className="mb-5 text-sm text-gray-400">
                    Drag and drop your file here, or click to browse
                  </p>
                  
                  <p className="text-xs text-gray-500">
                    PDF files only (Max 10MB)
                  </p>
                  
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept=".pdf" 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left sidebar with analysis options */}
                <div className="w-full lg:w-1/3 space-y-4">
                  <button 
                    onClick={handleClear}
                    className="mb-4 px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition"
                  >
                    Upload Different File
                  </button>
                  
                  <div className="card p-6">
                    <h2 className="text-xl font-semibold mb-4">Analysis Tools</h2>
                    
                    <div className="space-y-4">
                      <div className="card p-4 hover:bg-gray-700 cursor-pointer transition" onClick={() => handleAnalyze('summary')}>
                        <h3 className="font-medium">Summary</h3>
                        <p className="text-sm text-gray-400">Get a concise summary of the document</p>
                      </div>
                      
                      <div className="card p-4 hover:bg-gray-700 cursor-pointer transition" onClick={() => handleAnalyze('keyPoints')}>
                        <h3 className="font-medium">Key Points</h3>
                        <p className="text-sm text-gray-400">Extract the main arguments and key points</p>
                      </div>
                      
                      <div className="card p-4 hover:bg-gray-700 cursor-pointer transition" onClick={() => handleAnalyze('criticalAnalysis')}>
                        <h3 className="font-medium">Critical Analysis</h3>
                        <p className="text-sm text-gray-400">Evaluate the strength of arguments and evidence</p>
                      </div>
                    </div>
                  </div>
                  
                  {analysisResult && (
                    <div className="card p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        {analysisType === 'summary' ? 'Summary' : 
                         analysisType === 'keyPoints' ? 'Key Points' : 
                         'Critical Analysis'}
                      </h2>
                      
                      {isAnalyzing ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                          <span className="ml-3">Analyzing document...</span>
                        </div>
                      ) : (
                        <div className="prose dark:prose-invert max-w-none">
                          <div className="whitespace-pre-line">{analysisResult}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* PDF Viewer */}
                <div className="w-full lg:w-2/3">
                  <div className="card p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      {file?.name || 'Document Viewer'}
                    </h2>
                    <div className="w-full h-[calc(100vh-300px)] min-h-[500px] border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
                      {fileUrl && (
                        <iframe
                          src={`${fileUrl}#view=FitH`}
                          className="w-full h-full"
                          title="PDF Viewer"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}