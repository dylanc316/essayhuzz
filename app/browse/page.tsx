'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Types
interface Essay {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  likes: number;
  tags: string[];
}

// Mock data
const MOCK_ESSAYS: Essay[] = [
  {
    id: '1',
    title: 'The Impact of Artificial Intelligence on Modern Society',
    author: 'John Smith',
    excerpt: 'This paper explores how AI technologies are reshaping various aspects of contemporary society, from healthcare to transportation.',
    category: 'Technology',
    date: '2025-02-15',
    readTime: 8,
    likes: 124,
    tags: ['AI', 'Technology', 'Society', 'Future']
  },
  {
    id: '2',
    title: 'Climate Change: A Comprehensive Analysis',
    author: 'Emily Johnson',
    excerpt: 'An examination of current climate trends, policy responses, and potential future scenarios based on the latest scientific research.',
    category: 'Science',
    date: '2025-01-20',
    readTime: 12,
    likes: 98,
    tags: ['Climate', 'Environment', 'Science', 'Policy']
  },
  {
    id: '3',
    title: 'The Evolution of Modern Financial Systems',
    author: 'Michael Rodriguez',
    excerpt: 'This essay traces the development of financial institutions and markets from the early 20th century to the present day.',
    category: 'Economics',
    date: '2025-02-05',
    readTime: 10,
    likes: 76,
    tags: ['Finance', 'Economics', 'History', 'Banking']
  },
  {
    id: '4',
    title: 'Philosophical Implications of Quantum Mechanics',
    author: 'Sarah Chen',
    excerpt: 'An exploration of how quantum physics challenges classical philosophical concepts of reality, determinism, and objectivity.',
    category: 'Philosophy',
    date: '2025-01-10',
    readTime: 15,
    likes: 105,
    tags: ['Physics', 'Philosophy', 'Quantum', 'Metaphysics']
  },
  {
    id: '5',
    title: 'The Socioeconomic Impacts of COVID-19',
    author: 'David Kim',
    excerpt: 'Analysis of how the global pandemic reshaped economies, social structures, and international relations across the world.',
    category: 'Social Sciences',
    date: '2025-02-18',
    readTime: 9,
    likes: 88,
    tags: ['COVID-19', 'Economics', 'Society', 'Health']
  },
  {
    id: '6',
    title: 'Modern Approaches to Sustainable Urban Planning',
    author: 'Alexandra Torres',
    excerpt: 'This paper discusses innovative strategies for creating environmentally sustainable and socially equitable urban environments.',
    category: 'Urban Planning',
    date: '2025-01-30',
    readTime: 11,
    likes: 67,
    tags: ['Urban', 'Sustainability', 'Architecture', 'Environment']
  },
  {
    id: '7',
    title: 'The Digital Transformation of Education',
    author: 'Robert Lee',
    excerpt: 'An examination of how digital technologies are changing teaching methods, learning experiences, and educational outcomes.',
    category: 'Education',
    date: '2025-02-08',
    readTime: 7,
    likes: 112,
    tags: ['Education', 'Digital', 'Learning', 'Technology']
  },
  {
    id: '8',
    title: 'The Future of Work in an Automated Economy',
    author: 'Jasmine Patel',
    excerpt: 'This essay explores how automation and AI will transform labor markets, job skills, and economic opportunities.',
    category: 'Economics',
    date: '2025-02-22',
    readTime: 9,
    likes: 93,
    tags: ['Automation', 'Economics', 'Employment', 'Future']
  }
];

// Get unique categories from essays
const getCategories = (essays: Essay[]): string[] => {
  const categoriesSet = new Set(essays.map(essay => essay.category));
  return Array.from(categoriesSet);
};

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('date');
  const [essays, setEssays] = useState<Essay[]>([]);
  const [filteredEssays, setFilteredEssays] = useState<Essay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate data fetching
  useEffect(() => {
    const fetchEssays = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch('/api/essays');
        // const data = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setEssays(MOCK_ESSAYS);
      } catch (error) {
        console.error('Error fetching essays:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEssays();
  }, []);
  
  // Filter and sort essays based on user selections
  useEffect(() => {
    let result = [...essays];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        essay => 
          essay.title.toLowerCase().includes(query) ||
          essay.author.toLowerCase().includes(query) ||
          essay.excerpt.toLowerCase().includes(query) ||
          essay.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All Categories') {
      result = result.filter(essay => essay.category === selectedCategory);
    }
    
    // Sort essays
    switch (sortBy) {
      case 'date':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'popularity':
        result.sort((a, b) => b.likes - a.likes);
        break;
      case 'readTime':
        result.sort((a, b) => a.readTime - b.readTime);
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    
    setFilteredEssays(result);
  }, [essays, searchQuery, selectedCategory, sortBy]);
  
  const categories = ['All Categories', ...getCategories(essays)];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse Essays</h1>
        
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input 
                type="text" 
                placeholder="Search essays..." 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <select 
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select 
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Most Recent</option>
                <option value="popularity">Most Popular</option>
                <option value="readTime">Shortest Read</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 py-1">Popular Tags:</span>
            {['AI', 'Technology', 'Science', 'Economics', 'Philosophy'].map(tag => (
              <button 
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className={`px-3 py-1 text-sm rounded-full ${
                  searchQuery === tag 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredEssays.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No essays found matching your search criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Categories');
              }}
              className="px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-700 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEssays.map(essay => (
              <div 
                key={essay.id} 
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded">
                      {essay.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{essay.readTime} min read</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2">{essay.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">By {essay.author}</p>
                  <p className="mb-4">{essay.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {essay.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/essay/${essay.id}`} 
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Read more
                    </Link>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                      </svg>
                      {essay.likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}