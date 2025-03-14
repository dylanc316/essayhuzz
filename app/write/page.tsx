import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Write() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Write an Essay</h1>
        
        <form className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input 
              type="text" 
              placeholder="Enter essay title" 
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Category</label>
            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Academic</option>
              <option>Personal</option>
              <option>Creative</option>
              <option>Other</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Content</label>
            <textarea 
              rows={15} 
              placeholder="Write your essay here..." 
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <button 
              type="button" 
              className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Save Draft
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Publish
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}