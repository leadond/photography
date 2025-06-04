import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '../context/SearchContext';

const SearchBar = ({ fullWidth = false, showSuggestions = true }) => {
  const { 
    searchTerm, 
    setSearchTerm, 
    searchVideos, 
    recentSearches, 
    popularSearches 
  } = useSearch();
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchVideos(searchTerm);
      navigate('/search');
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    searchVideos(suggestion);
    navigate('/search');
    setIsFocused(false);
  };

  return (
    <div className={`relative ${fullWidth ? 'w-full' : 'max-w-2xl mx-auto'}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for any how-to video..."
          className="w-full py-3 pl-5 pr-12 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none shadow-sm transition-all"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && (
        <AnimatePresence>
          {isFocused && (recentSearches.length > 0 || popularSearches.length > 0) && (
            <motion.div
              ref={suggestionsRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
            >
              {recentSearches.length > 0 && (
                <div className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-500">Recent Searches</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        useSearch().clearRecentSearches();
                      }}
                      className="text-xs text-blue-500 hover:text-blue-700"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <div
                        key={`recent-${index}`}
                        onClick={() => handleSuggestionClick(search)}
                        className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-700">{search}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {popularSearches.length > 0 && (
                <div className="p-3 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <div
                        key={`popular-${index}`}
                        onClick={() => handleSuggestionClick(search)}
                        className="bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 cursor-pointer"
                      >
                        {search}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default SearchBar;
