export default function Footer() {
    return (
      <footer className="border-t border-gray-200 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} EssayHuzz. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-sm text-gray-600 hover:underline">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-600 hover:underline">Terms of Service</a>
            <a href="#" className="text-sm text-gray-600 hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    );
  }