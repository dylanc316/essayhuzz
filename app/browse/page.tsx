import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Browse() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Browse Essays</h1>
        
        <div className="flex space-x-4 mb-6">
          <input 
            type="text" 
            placeholder="Search essays..." 
            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Academic</option>
            <option>Personal</option>
            <option>Creative</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for essay cards */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Essay Title</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">By Author Name</p>
              <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="flex justify-between items-center">
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Read more</a>
                <span className="text-sm text-gray-500">5 min read</span>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
