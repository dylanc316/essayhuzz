import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            EssayHuzz
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/about" 
              className="hover:text-blue-400 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/login" 
              className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link 
              href="/login" 
              className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>
      
      {/* Rest of your component */}
    </div>
  );
}