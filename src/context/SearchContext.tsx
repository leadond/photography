import { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  embedUrl: string;
  source: string;
  duration: string;
  views: number;
  category: string;
  tags: string[];
  createdAt: string;
}

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  videos: Video[];
  loading: boolean;
  error: string | null;
  searchVideos: (query: string) => Promise<void>;
  recentSearches: string[];
  clearRecentSearches: () => void;
  popularSearches: string[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Simulated popular searches
  const popularSearches = [
    'cooking recipes', 
    'home repair', 
    'gardening tips', 
    'DIY crafts', 
    'workout routines'
  ];

  // Mock data for development
  const mockVideos: Video[] = [
    {
      id: '1',
      title: 'How to Make Perfect Pasta',
      description: 'Learn the secrets to cooking perfect pasta every time with these professional tips.',
      thumbnail: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      embedUrl: 'https://www.youtube.com/embed/UYhKDweME3A',
      source: 'youtube',
      duration: '8:24',
      views: 1245678,
      category: 'Cooking',
      tags: ['pasta', 'cooking', 'italian food'],
      createdAt: '2023-01-15T14:48:00.000Z',
    },
    {
      id: '2',
      title: 'DIY Home Repairs Everyone Should Know',
      description: 'Basic home repair skills that will save you money and time.',
      thumbnail: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      embedUrl: 'https://www.youtube.com/embed/KwshAhEZVxs',
      source: 'youtube',
      duration: '15:32',
      views: 987432,
      category: 'DIY',
      tags: ['home repair', 'DIY', 'tools'],
      createdAt: '2023-02-22T09:15:00.000Z',
    },
    {
      id: '3',
      title: "Beginner's Guide to Gardening",
      description: 'Start your gardening journey with these simple tips for beginners.',
      thumbnail: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      embedUrl: 'https://www.youtube.com/embed/B0DrWAUsNSc',
      source: 'youtube',
      duration: '12:45',
      views: 567890,
      category: 'Gardening',
      tags: ['gardening', 'plants', 'beginners'],
      createdAt: '2023-03-10T16:30:00.000Z',
    },
    {
      id: '4',
      title: '30-Minute Full Body Workout',
      description: 'Complete full body workout you can do at home with no equipment.',
      thumbnail: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      embedUrl: 'https://www.youtube.com/embed/UBMk30rjy0o',
      source: 'youtube',
      duration: '30:15',
      views: 2345678,
      category: 'Fitness',
      tags: ['workout', 'fitness', 'exercise'],
      createdAt: '2023-01-05T08:20:00.000Z',
    },
    {
      id: '5',
      title: 'How to Fix a Leaky Faucet',
      description: 'Step-by-step guide to fixing a leaky faucet without calling a plumber.',
      thumbnail: 'https://images.pexels.com/photos/1027508/pexels-photo-1027508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      embedUrl: 'https://www.youtube.com/embed/F5JWWzwXTJk',
      source: 'youtube',
      duration: '7:18',
      views: 789456,
      category: 'DIY',
      tags: ['plumbing', 'home repair', 'DIY'],
      createdAt: '2023-02-18T11:45:00.000Z',
    },
    {
      id: '6',
      title: 'Easy Homemade Bread Recipe',
      description: 'Make delicious homemade bread with this simple recipe.',
      thumbnail: 'https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      embedUrl: 'https://www.youtube.com/embed/lipLAgZkWN0',
      source: 'youtube',
      duration: '10:52',
      views: 1234567,
      category: 'Cooking',
      tags: ['baking', 'bread', 'recipe'],
      createdAt: '2023-03-25T14:10:00.000Z',
    }
  ];

  const searchVideos = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call an API or Supabase
      // For now, we'll use mock data and filter based on the query
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter mock videos based on search query
      const filteredVideos = mockVideos.filter(video => 
        video.title.toLowerCase().includes(query.toLowerCase()) || 
        video.description.toLowerCase().includes(query.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      
      setVideos(filteredVideos);
      
      // Save to recent searches
      if (!recentSearches.includes(query)) {
        const updated = [query, ...recentSearches].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
      }
      
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search videos. Please try again.');
      toast.error('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        videos,
        loading,
        error,
        searchVideos,
        recentSearches,
        clearRecentSearches,
        popularSearches
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
