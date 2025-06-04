import { createContext, useContext, useState, ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'
import { useAuth } from './AuthContext'

export interface BookingPackage {
  id: string
  name: string
  description: string
  price: number
  duration: string
  features: string[]
  popular?: boolean
}

export interface BookingRequest {
  id?: string
  user_id?: string
  package_id: string
  date: Date
  time: string
  location: string
  notes: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at?: string
}

interface BookingContextType {
  packages: BookingPackage[]
  userBookings: BookingRequest[]
  loading: boolean
  submitBookingRequest: (booking: BookingRequest) => Promise<void>
  fetchUserBookings: (userId: string) => Promise<void>
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [packages, setPackages] = useState<BookingPackage[]>([
    {
      id: 'graduation',
      name: 'Graduation Package',
      description: 'Perfect for capturing your graduation day memories.',
      price: 299,
      duration: '1 hour',
      features: [
        '1-hour photo session',
        'Up to 3 outfit changes',
        '25 digital images',
        'Online gallery',
        'Print release',
        '5 professional prints (8x10)'
      ],
      popular: false
    },
    {
      id: 'family',
      name: 'Family Portrait Package',
      description: 'Capture beautiful family moments to cherish forever.',
      price: 349,
      duration: '1.5 hours',
      features: [
        '1.5-hour photo session',
        'Up to 2 locations',
        '30 digital images',
        'Online gallery',
        'Print release',
        '1 canvas print (16x20)'
      ],
      popular: true
    },
    {
      id: 'corporate',
      name: 'Corporate Event Package',
      description: 'Professional coverage for your corporate events.',
      price: 599,
      duration: '4 hours',
      features: [
        '4-hour event coverage',
        'Multiple photographers',
        '100+ digital images',
        'Online gallery',
        'Commercial usage rights',
        'Quick turnaround (48 hours)'
      ],
      popular: false
    },
    {
      id: 'headshots',
      name: 'Professional Headshots',
      description: 'Elevate your professional image with quality headshots.',
      price: 199,
      duration: '30 minutes',
      features: [
        '30-minute studio session',
        '2 outfit changes',
        '10 digital images',
        'Professional retouching',
        'Online gallery',
        'LinkedIn optimization'
      ],
      popular: false
    }
  ])
  const [userBookings, setUserBookings] = useState<BookingRequest[]>([])
  const [loading, setLoading] = useState(false)

  const submitBookingRequest = async (booking: BookingRequest) => {
    try {
      setLoading(true)
      
      // In a real implementation, this would save to Supabase
      // For now, we'll just simulate a successful submission
      
      // Add user_id if authenticated
      if (user) {
        booking.user_id = user.id
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Booking request submitted successfully! We\'ll contact you soon to confirm.')
      
      // In a real implementation, we would return the created booking with an ID
      return
    } catch (error: any) {
      toast.error('Failed to submit booking request')
      console.error('Error submitting booking:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const fetchUserBookings = async (userId: string) => {
    try {
      setLoading(true)
      
      // In a real implementation, this would fetch from Supabase
      // For now, we'll use sample data
      
      const sampleBookings: BookingRequest[] = [
        {
          id: '1',
          user_id: userId,
          package_id: 'graduation',
          date: new Date('2023-08-15'),
          time: '10:00 AM',
          location: 'Downtown Houston',
          notes: 'Graduation photos for my daughter',
          status: 'confirmed',
          created_at: new Date('2023-07-20').toISOString()
        },
        {
          id: '2',
          user_id: userId,
          package_id: 'headshots',
          date: new Date('2023-09-05'),
          time: '2:00 PM',
          location: 'Studio',
          notes: 'Need professional headshots for LinkedIn',
          status: 'pending',
          created_at: new Date('2023-08-01').toISOString()
        }
      ]
      
      setUserBookings(sampleBookings)
      
    } catch (error: any) {
      toast.error('Failed to load your bookings')
      console.error('Error fetching user bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    packages,
    userBookings,
    loading,
    submitBookingRequest,
    fetchUserBookings
  }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
