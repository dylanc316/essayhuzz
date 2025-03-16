import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-[#1f2937] py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            EssayHuzz
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/about" 
              className="hover:text-[#60a5fa] transition-colors"
            >
              About
            </Link>
            <Link 
              href="/login" 
              className="btn-primary"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link 
              href="/login" 
              className="btn-primary"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col-reverse lg:flex-row items-center">
              <div className="lg:w-1/2 mt-10 lg:mt-0 lg:pr-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                  Your Complete Essay Helper
                </h1>
                <p className="text-xl text-[#d1d5db] mb-8 max-w-xl">
                  Get accurate quotations, authentic analysis, and pass AI checkers. We help students write better essays and understand their texts deeply.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:space-x-4">
                  <Link 
                    href="/signup" 
                    className="btn-primary text-center"
                  >
                    Get Started
                  </Link>
                  <Link 
                    href="/login" 
                    className="btn-outline text-center"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="card p-6 shadow-lg border-2 border-[#374151]">
                  <div className="h-10 bg-[#374151] flex items-center px-4 border-b border-[#4b5563] rounded-t-lg">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-[#ef4444] rounded-full"></div>
                      <div className="w-3 h-3 bg-[#eab308] rounded-full"></div>
                      <div className="w-3 h-3 bg-[#22c55e] rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-6 bg-[#1f2937] rounded-b-lg">
                    <div className="space-y-4">
                      <div className="flex space-x-2 items-center">
                        <div className="bg-[#3b82f6] h-4 w-4 rounded-full"></div>
                        <div className="text-sm font-medium">Upload Text or PDF</div>
                      </div>
                      <div className="border border-[#374151] p-4 rounded-md bg-[#111827]">
                        <div className="h-4 w-3/4 bg-[#374151] rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-[#374151] rounded mb-2"></div>
                        <div className="h-4 w-5/6 bg-[#374151] rounded"></div>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <div className="bg-[#22c55e] h-4 w-4 rounded-full"></div>
                        <div className="text-sm font-medium">Get Perfect Quotations & Analysis</div>
                      </div>
                      <div className="border border-[#374151] p-4 rounded-md bg-[#111827]">
                        <div className="mb-2 p-2 bg-[#172554] rounded-md">
                          <div className="h-3 w-5/6 bg-[#374151] rounded mb-1"></div>
                          <div className="h-3 w-3/4 bg-[#374151] rounded"></div>
                        </div>
                        <div className="h-4 w-5/6 bg-[#374151] rounded mb-2"></div>
                        <div className="h-4 w-3/4 bg-[#374151] rounded mb-2"></div>
                        <div className="h-4 w-5/6 bg-[#374151] rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-[#030712]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Students Choose EssayHuzz</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center card p-6">
                <div className="w-16 h-16 bg-[#172554] text-[#60a5fa] rounded-full flex items-center justify-center mb-4">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">100% AI-Checker Proof</h3>
                <p className="text-[#9ca3af]">
                  Our essays pass AI detection tools while maintaining high quality and academic standards.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center card p-6">
                <div className="w-16 h-16 bg-[#172554] text-[#60a5fa] rounded-full flex items-center justify-center mb-4">
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
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Perfect Quotations</h3>
                <p className="text-[#9ca3af]">
                  Get exact quotes from your texts, properly cited and integrated with insightful analysis.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center card p-6">
                <div className="w-16 h-16 bg-[#172554] text-[#60a5fa] rounded-full flex items-center justify-center mb-4">
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
                <h3 className="text-xl font-semibold mb-2">Detailed Breakdowns</h3>
                <p className="text-[#9ca3af]">
                  Chapter-by-chapter or act-by-act summaries with key themes, character analysis, and critical insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How EssayHuzz Works</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-[#2563eb] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-semibold">Upload Your Text</h3>
                  </div>
                  <p className="text-[#9ca3af] mb-4">
                    Whether it's a novel, play, or other literature, simply upload your PDF or paste the text.
                  </p>
                </div>
                
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-[#2563eb] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-semibold">Select Your Needs</h3>
                  </div>
                  <p className="text-[#9ca3af] mb-4">
                    Choose from essay writing help, chapter summaries, character analysis, or theme exploration.
                  </p>
                </div>
                
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-[#2563eb] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-semibold">Get Detailed Insights</h3>
                  </div>
                  <p className="text-[#9ca3af] mb-4">
                    Receive human-like analysis with precise quotations, structured arguments, and deep insights.
                  </p>
                </div>
                
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-[#2563eb] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <h3 className="text-xl font-semibold">Ace Your Assignment</h3>
                  </div>
                  <p className="text-[#9ca3af] mb-4">
                    Use our AI-proof content to enhance your understanding and improve your grades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Section */}
        <section className="py-16 bg-[#030712]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Created By</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-[#1f2937] p-6 rounded-lg shadow">
                <div className="w-24 h-24 bg-[#374151] rounded-full mx-auto mb-4 flex items-center justify-center text-[#6b7280]">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-14 w-14" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-center mb-2">Dylan Cheng</h3>
                <p className="text-[#9ca3af] text-center mb-4">
                  Computer Science & Mathematics Student
                </p>
                <p className="text-[#d1d5db] text-center">
                  Dylan is studying Computer Science and Mathematics at the University of Chicago. Originally from Virginia, he specializes in algorithm development and has a passion for creating intuitive user interfaces.
                </p>
              </div>
              
              <div className="bg-[#1f2937] p-6 rounded-lg shadow">
                <div className="w-24 h-24 bg-[#374151] rounded-full mx-auto mb-4 flex items-center justify-center text-[#6b7280]">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-14 w-14" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-center mb-2">Angelo Rizzieri</h3>
                <p className="text-[#9ca3af] text-center mb-4">
                  Computer Science & Mathematics Student
                </p>
                <p className="text-[#d1d5db] text-center">
                  Angelo is pursuing a dual degree in Computer Science and Mathematics at the University of Chicago. From New Jersey, his research interests include natural language processing and machine learning applications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-[#172554] rounded-xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to revolutionize your writing?</h2>
                <p className="text-lg mb-8 text-[#d1d5db]">
                  Join now to improve your essays and academic papers with AI-powered analysis.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-0 sm:space-x-4">
                  <Link 
                    href="/signup" 
                    className="btn-primary px-8 py-3 text-center"
                  >
                    Get Started Now
                  </Link>
                  <Link 
                    href="/login" 
                    className="btn-outline px-8 py-3 text-center"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1f2937] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-lg font-semibold">
                EssayHuzz
              </Link>
              <p className="text-sm text-[#9ca3af] mt-1">
                AI-powered essay analysis by UChicago students
              </p>
            </div>
            
            <div className="flex space-x-6">
              <Link 
                href="/about" 
                className="text-[#9ca3af] hover:text-[#60a5fa] transition-colors"
              >
                About
              </Link>
              <Link 
                href="/login" 
                className="text-[#9ca3af] hover:text-[#60a5fa] transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="text-[#9ca3af] hover:text-[#60a5fa] transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
          
          <div className="text-center text-xs text-[#6b7280] mt-6">
            &copy; {new Date().getFullYear()} EssayHuzz. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}