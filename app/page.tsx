import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-16 flex flex-col items-center">
          <h1 className="text-5xl font-bold text-center mb-8">Welcome to EssayHuzz</h1>
          <p className="text-xl text-center max-w-2xl mb-8">Your platform for writing, sharing, and discovering outstanding essays.</p>
          <div className="flex space-x-4">
            <a href="/browse" className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90">Browse Essays</a>
            <a href="/write" className="px-6 py-3 border border-black dark:border-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Start Writing</a>
          </div>
        </section>
        
        <section className="bg-gray-100 dark:bg-gray-800 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Essays</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Placeholder for featured essays */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2">Essay Title</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">By Author Name</p>
                  <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Read more</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}