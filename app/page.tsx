import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col-reverse lg:flex-row items-center">
              <div className="lg:w-1/2 mt-10 lg:mt-0 lg:pr-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                  AI-Powered Essay Analysis
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-xl">
                  Upload your essay or academic paper and get instant analysis, summaries, and insights to enhance your understanding.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link 
                    href="/analyze" 
                    className="btn-primary px-6 py-3 text-center"
                  >
                    Analyze a Document
                  </Link>
                  <Link 
                    href="/login" 
                    className="btn-outline px-6 py-3 text-center"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="card p-6 shadow-lg border-2 border-gray-700">
                  <div className="h-10 bg-gray-700 flex items-center px-4 border-b border-gray-600 rounded-t-lg">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-6 bg-gray-800 rounded-b-lg">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="w-full lg:w-1/3">
                        <div className="space-y-4">
                          <div className="h-10 w-full bg-blue-900/30 rounded"></div>
                          <div className="h-24 w-full bg-gray-700 rounded p-3">
                            <div className="h-4 w-3/4 bg-gray-600 rounded mb-2"></div>
                            <div className="h-4 w-1/2 bg-gray-600 rounded"></div>
                          </div>
                          <div className="h-24 w-full bg-gray-700 rounded p-3">
                            <div className="h-4 w-3/4 bg-gray-600 rounded mb-2"></div>
                            <div className="h-4 w-2/3 bg-gray-600 rounded"></div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-2/3">
                        <div className="h-72 bg-gray-700 rounded flex items-center justify-center">
                          <div className="text-center">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-12 w-12 text-gray-500 mx-auto mb-4" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={1.5} 
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                              />
                            </svg>
                            <div className="text-gray-400">Document Viewer</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Your Document</h3>
                <p className="text-gray-400">
                  Simply upload your essay, research paper, or any academic document in PDF format.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                <p className="text-gray-400">
                  Our advanced AI analyzes your document, identifying key themes, arguments, and structures.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8" 
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
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
                <p className="text-gray-400">
                  Receive detailed summaries, key points extraction, and critical analysis to enhance your understanding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-blue-900/30 rounded-xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to transform your academic experience?</h2>
                <p className="text-lg mb-8 text-gray-300">
                  Join now to improve your essays and academic papers with AI-powered analysis.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link 
                    href="/signup" 
                    className="btn-primary px-8 py-3"
                  >
                    Sign Up
                  </Link>
                  <Link 
                    href="/analyze" 
                    className="btn-outline px-8 py-3"
                  >
                    Try It Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}