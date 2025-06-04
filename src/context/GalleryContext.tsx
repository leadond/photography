import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export interface Photo {
  id: string
  url: string
  title: string
  category: string
  description?: string
  featured?: boolean
  created_at: string
}

export interface Album {
  id: string
  title: string
  description: string
  cover_image: string
  created_at: string
  photo_count: number
}

interface GalleryContextType {
  photos: Photo[]
  featuredPhotos: Photo[]
  albums: Album[]
  userAlbums: Album[]
  categories: string[]
  loading: boolean
  fetchPhotos: () => Promise<void>
  fetchAlbumPhotos: (albumId: string) => Promise<Photo[]>
  fetchUserAlbums: (userId: string) => Promise<void>
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined)

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [featuredPhotos, setFeaturedPhotos] = useState<Photo[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [userAlbums, setUserAlbums] = useState<Album[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPhotos()
    fetchAlbums()
  }, [])

  const fetchPhotos = async () => {
    try {
      setLoading(true)
      
      // In a real implementation, this would fetch from Supabase
      // For now, we'll use sample data
      
      const samplePhotos: Photo[] = [
        {
          id: '1',
          url: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg',
          title: 'Graduation Portrait',
          category: 'Graduation',
          featured: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          url: 'https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg',
          title: 'Senior Photo Session',
          category: 'Senior Photos',
          featured: true,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          url: 'https://images.pexels.com/photos/2774197/pexels-photo-2774197.jpeg',
          title: 'Professional Headshot',
          category: 'Headshots',
          featured: true,
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
          title: 'Prom Night',
          category: 'Prom',
          featured: true,
          created_at: new Date().toISOString()
        },
        {
          id: '5',
          url: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
          title: 'Corporate Event',
          category: 'Business Events',
          created_at: new Date().toISOString()
        },
        {
          id: '6',
          url: 'https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg',
          title: 'Birthday Celebration',
          category: 'Parties',
          created_at: new Date().toISOString()
        },
        {
          id: '7',
          url: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
          title: 'Fashion Editorial',
          category: 'Fashion',
          featured: true,
          created_at: new Date().toISOString()
        },
        {
          id: '8',
          url: 'https://images.pexels.com/photos/2531734/pexels-photo-2531734.jpeg',
          title: 'Model Portfolio',
          category: 'Modeling',
          created_at: new Date().toISOString()
        },
        {
          id: '9',
          url: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg',
          title: 'Graduation Ceremony',
          category: 'Graduation',
          created_at: new Date().toISOString()
        },
        {
          id: '10',
          url: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg',
          title: 'Corporate Headshot',
          category: 'Headshots',
          created_at: new Date().toISOString()
        },
        {
          id: '11',
          url: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg',
          title: 'Business Conference',
          category: 'Business Events',
          created_at: new Date().toISOString()
        },
        {
          id: '12',
          url: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
          title: 'Graduation Group',
          category: 'Graduation',
          created_at: new Date().toISOString()
        }
      ]
      
      setPhotos(samplePhotos)
      setFeaturedPhotos(samplePhotos.filter(photo => photo.featured))
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(samplePhotos.map(photo => photo.category)))
      setCategories(uniqueCategories)
      
    } catch (error: any) {
      toast.error('Failed to load photos')
      console.error('Error fetching photos:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAlbums = async () => {
    try {
      setLoading(true)
      
      // Sample albums data
      const sampleAlbums: Album[] = [
        {
          id: '1',
          title: 'Houston High School Graduation 2023',
          description: 'Capturing the special moments of the Class of 2023',
          cover_image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
          created_at: new Date().toISOString(),
          photo_count: 48
        },
        {
          id: '2',
          title: 'Corporate Headshots - Tech Company',
          description: 'Professional headshots for company website and LinkedIn',
          cover_image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
          created_at: new Date().toISOString(),
          photo_count: 32
        },
        {
          id: '3',
          title: 'Summer Fashion Editorial',
          description: 'Fashion shoot for local Houston magazine',
          cover_image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg',
          created_at: new Date().toISOString(),
          photo_count: 65
        },
        {
          id: '4',
          title: 'Johnson Family Portraits',
          description: 'Family portrait session at Hermann Park',
          cover_image: 'https://images.pexels.com/photos/1231365/pexels-photo-1231365.jpeg',
          created_at: new Date().toISOString(),
          photo_count: 24
        }
      ]
      
      setAlbums(sampleAlbums)
      
    } catch (error: any) {
      toast.error('Failed to load albums')
      console.error('Error fetching albums:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAlbumPhotos = async (albumId: string): Promise<Photo[]> => {
    try {
      setLoading(true)
      
      // In a real implementation, this would fetch from Supabase based on albumId
      // For now, return a subset of sample photos
      const albumPhotos = photos.slice(0, 8)
      
      return albumPhotos
    } catch (error: any) {
      toast.error('Failed to load album photos')
      console.error('Error fetching album photos:', error)
      return []
    } finally {
      setLoading(false)
    }
  }

  const fetchUserAlbums = async (userId: string) => {
    try {
      setLoading(true)
      
      // In a real implementation, this would fetch user-specific albums from Supabase
      // For now, we'll use sample data
      
      const sampleUserAlbums: Album[] = [
        {
          id: '5',
          title: 'Your Senior Photoshoot',
          description: 'Your senior photos taken on June 15, 2023',
          cover_image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
          created_at: new Date().toISOString(),
          photo_count: 35
        },
        {
          id: '6',
          title: 'Your Family Session',
          description: 'Family portraits at Discovery Green',
          cover_image: 'https://images.pexels.com/photos/1231365/pexels-photo-1231365.jpeg',
          created_at: new Date().toISOString(),
          photo_count: 42
        }
      ]
      
      setUserAlbums(sampleUserAlbums)
      
    } catch (error: any) {
      toast.error('Failed to load your albums')
      console.error('Error fetching user albums:', error)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    photos,
    featuredPhotos,
    albums,
    userAlbums,
    categories,
    loading,
    fetchPhotos,
    fetchAlbumPhotos,
    fetchUserAlbums
  }

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
}

export function useGallery() {
  const context = useContext(GalleryContext)
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider')
  }
  return context
}
