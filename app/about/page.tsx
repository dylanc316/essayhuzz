import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About EssayHuzz</h1>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg mb-6">
              At EssayHuzz, we&apos;re revolutionizing the way students and professionals approach written content. Our AI-powered platform helps you analyze, understand, and improve essays and academic papers with just a few clicks.
            </p>
            <p className="text-lg">
              We believe that technology should enhance your writing and analytical abilities, not replace them. Our tools are designed to provide insights and feedback that help you become a better writer and critical thinker.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-16 w-16" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-center mb-2">Angelo Rizzieri</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  Computer Science & Mathematics Student
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  Angelo is pursuing a dual degree in Computer Science and Mathematics at the University of Chicago. His research interests include natural language processing and machine learning applications in education.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-16 w-16" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-center mb-2">Dylan Cheng</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  Computer Science & Mathematics Student
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  Dylan is studying Computer Science and Mathematics at the University of Chicago. He specializes in algorithm development and has a passion for creating intuitive user interfaces for complex technological solutions.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
            <p className="text-lg mb-4">
              EssayHuzz leverages state-of-the-art natural language processing (NLP) technologies to analyze written content. Our platform can identify key themes, summarize documents, evaluate arguments, and provide constructive feedback.
            </p>
            <p className="text-lg">
              We continuously improve our algorithms based on user feedback and the latest advancements in AI research to provide the most accurate and helpful analysis possible.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-lg">
              Have questions or suggestions? We&apos;d love to hear from you! Contact us at <a href="mailto:info@essayhuzz.com" className="text-blue-600 dark:text-blue-400 hover:underline">info@essayhuzz.com</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}