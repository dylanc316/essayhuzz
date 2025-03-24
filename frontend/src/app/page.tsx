'use client';

import AppLayout from '@/components/layout/AppLayout';
import Link from 'next/link';

export default function HomePage() {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <section className="text-center py-12 px-4">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Write Better Essays with AI
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            EssayHuzz helps you craft well-structured essays with accurate quotations, 
            thoughtful analysis, and human-sounding content that passes AI checkers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/write"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Start Writing
            </Link>
            <Link
              href="/browse"
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Browse Examples
            </Link>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-14 h-14 bg-blue-500 rounded-full mb-6 flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Your Text</h3>
              <p className="text-gray-300">
                Upload the text you're analyzing or select from our library of pre-loaded classics.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-14 h-14 bg-blue-500 rounded-full mb-6 flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Select Your Topic</h3>
              <p className="text-gray-300">
                Choose what you want to write about - character analysis, thematic exploration, or chapter summaries.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-14 h-14 bg-blue-500 rounded-full mb-6 flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Generate & Refine</h3>
              <p className="text-gray-300">
                Get a fully structured essay with accurate quotations and analysis that you can customize and refine.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
} 