import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const GalleryContext = createContext();

export const useGallery = () => useContext(GalleryContext);

export const GalleryProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gallery images
  const fetchImages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // This would be replaced with actual Supabase query
      // For now, using mock data
      setImages(mockImages);
      setCategories(['all', 'wedding', 'portrait', 'event', 'nature', 'commercial']);
      
      // Example of how the actual query would look:
      // const { data, error } = await supabase
      //   .from('gallery_images')
      //   .select('*')
      //   .order('created_at', { ascending: false });
      
      // if (error) throw error;
      // setImages(data);
      
      // const { data: categoryData, error: categoryError } = await supabase
      //   .from('categories')
      //   .select('*');
      
      // if (categoryError) throw categoryError;
      // setCategories(['all', ...categoryData.map(c => c.name)]);
      
    } catch (error) {
      console.error('Error fetching gallery images:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Filter images by category
  const filterImagesByCategory = (category) => {
    if (category === 'all') {
      return images;
    }
    return images.filter(img => img.category === category);
  };

  const value = {
    images,
    categories,
    isLoading,
    error,
    filterImagesByCategory,
    refreshGallery: fetchImages
  };

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};

// Mock data for gallery images
const mockImages = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Wedding Ceremony",
    description: "Capturing the beautiful moment of a couple exchanging vows.",
    category: "wedding"
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/1266007/pexels-photo-1266007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Professional Portrait",
    description: "Corporate headshot with natural lighting.",
    category: "portrait"
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Corporate Event",
    description: "Annual company gathering with keynote speakers.",
    category: "event"
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Mountain Landscape",
    description: "Breathtaking view of mountains at sunset.",
    category: "nature"
  },
  {
    id: 5,
    url: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Urban Architecture",
    description: "Modern building with geometric patterns.",
    category: "commercial"
  },
  {
    id: 6,
    url: "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Family Portrait",
    description: "Happy family enjoying a day at the park.",
    category: "portrait"
  },
  {
    id: 7,
    url: "https://images.pexels.com/photos/1719344/pexels-photo-1719344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Concert Photography",
    description: "Live music performance with dramatic lighting.",
    category: "event"
  },
  {
    id: 8,
    url: "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Bridal Portrait",
    description: "Elegant bride in her wedding dress.",
    category: "wedding"
  }
];
