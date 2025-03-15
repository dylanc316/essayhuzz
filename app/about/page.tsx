import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto card p-8">
          <h1 className="text-3xl font-bold mb-6">About Us</h1>
          
          <section className="mb-10">
            <p className="text-lg mb-6">
              We are two UChicago double math and computer science majors.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow">
                <div className="w-28 h-28 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500">
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
                <p className="text-gray-400 text-center mb-4">
                  Computer Science & Mathematics Student
                </p>
                <p className="text-gray-300">
                  Dylan is studying Computer Science and Mathematics at the University of Chicago. Originally from Virginia, he specializes in algorithm development and has a passion for creating intuitive user interfaces for complex technological solutions.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg shadow">
                <div className="w-28 h-28 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500">
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
                <p className="text-gray-400 text-center mb-4">
                  Computer Science & Mathematics Student
                </p>
                <p className="text-gray-300">
                  Angelo is pursuing a dual degree in Computer Science and Mathematics at the University of Chicago. From New Jersey, his research interests include natural language processing and machine learning applications in education.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg mb-6">
              We created EssayHuzz to solve a problem we both experienced: the struggle to develop well-reasoned essays with proper quotations and analysis. While AI tools like ChatGPT can generate content, they often hallucinate or misrepresent source material.
            </p>
            <p className="text-lg mb-6">
              EssayHuzz bridges this gap by providing accurate quotations, structured analysis, and human-sounding content that passes AI checkers. We help students learn their texts deeply through chapter-by-chapter summaries, character analysis, and thematic explorations.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
            <p className="text-lg">
              Our platform uses advanced natural language processing to analyze texts with precision. We can process novels, plays, essays, and more to extract quotations, generate summaries, and create structured analysis that helps students truly understand their reading materials.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}