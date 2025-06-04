import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSearch } from '../context/SearchContext';
import SearchBar from '../components/SearchBar';
import VideoCard from '../components/VideoCard';

const SearchPage = () => {
  const location = useLocation();
  const { searchTerm, setSearchTerm, videos, loading, error, searchVideos } = useSearch();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Categories for filtering
  const categories = [
    'All',
    'Cooking',
    'DIY',
    'Fitness',
    'Technology',
    'Gardening',
    'Education'
  ];

  useEffect(() => {
    // Parse query parameters
    const params = new URLSearchParams(location.search);
    const queryTerm = params.get('q');
    const category = params.get('category');
    
    if (category) {
      setActiveCategory(category);
      setSearchTerm(category);
      searchVideos(category);
    } else if (queryTerm) {
      setSearchTerm(queryTerm);
      searchVideos(queryTerm);
    } else if (searchTerm) {
      // If there's already a search term in context, use that
      searchVideos(searchTerm);
    }
  }, [location.search]);

  // Filter videos by category if a category is selected
  const filteredVideos = activeCategory && activeCategory !== 'All'
    ? videos.filter(video => 
        video.category.toLowerCase() === activeCategory.toLowerCase() ||
        video.tags.some(tag => tag.toLowerCase() === activeCategory.toLowerCase())
      )
    : videos;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Find How-To Videos</h1>
          <SearchBar />
        </div>

        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category === 'All' ? null : category);
                  if (category !== 'All') {
                    searchVideos(category);
                  }
                }}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  (category === 'All' && !activeCategory) || category === activeCategory
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="text-red-500 mb-4">{error}</div>
            <p className="text-gray-600">Please try another search term or check your connection.</p>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">No videos found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any videos matching your search. Try different keywords or browse our categories.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                {activeCategory 
                  ? `${activeCategory} Videos` 
                  : searchTerm 
                    ? `Search results for "${searchTerm}"`
                    : 'All Videos'}
              </h2>
              <p className="text-gray-600">{filteredVideos.length} videos found</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video, index) => (
                <VideoCard key={video.id} video={video} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SearchPage;
