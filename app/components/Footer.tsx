import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-800 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-lg font-semibold">
              EssayHuzz
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              AI-powered essay analysis by UChicago students
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <Link 
              href="/analyze" 
              className="text-gray-400 hover:text-blue-400 transition text-center md:text-left"
            >
              Analyze
            </Link>
            <Link 
              href="/about" 
              className="text-gray-400 hover:text-blue-400 transition text-center md:text-left"
            >
              About
            </Link>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-500 mt-6">
          &copy; {currentYear} EssayHuzz. All rights reserved.
        </div>
      </div>
    </footer>
  );
}