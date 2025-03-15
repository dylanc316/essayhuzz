import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto card p-8">
          <h1 className="text-3xl font-bold mb-6">About Us</h1>
          
          <section className="mb-8">
            <p className="text-lg mb-6">
              We are two UChicago double math and computer science majors.
            </p>
            <p className="text-lg mb-6">
              We built EssayHuzz to help students and researchers analyze academic papers and essays using AI technology. 
              Our platform provides insights, summaries, and critical analysis to enhance understanding and improve writing.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
            <p className="text-lg mb-4">
              EssayHuzz leverages advanced natural language processing (NLP) technologies to analyze written content. 
              Our AI can identify key themes, summarize documents, evaluate arguments, and provide constructive feedback.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}