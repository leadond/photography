import { createContext, useContext, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user bookings
  const fetchUserBookings = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // This would be replaced with actual Supabase query
      // For now, using mock data
      setBookings(mockBookings);
      
      // Example of how the actual query would look:
      // const { data, error } = await supabase
      //   .from('bookings')
      //   .select('*')
      //   .eq('user_id', user.id)
      //   .order('date', { ascending: true });
      
      // if (error) throw error;
      // setBookings(data);
      
    } catch (error) {
      console.error('Error fetching bookings:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new booking
  const createBooking = async (bookingData) => {
    if (!user) throw new Error('You must be logged in to book a session');
    
    try {
      setIsLoading(true);
      setError(null);
      
      // This would be replaced with actual Supabase query
      // Example of how the actual query would look:
      // const { data, error } = await supabase
      //   .from('bookings')
      //   .insert([
      //     { 
      //       user_id: user.id,
      //       ...bookingData
      //     }
      //   ])
      //   .select();
      
      // if (error) throw error;
      
      // Mock successful booking
      const newBooking = {
        id: Date.now(),
        user_id: user.id,
        status: 'Pending',
        ...bookingData
      };
      
      setBookings(prev => [...prev, newBooking]);
      return newBooking;
      
    } catch (error) {
      console.error('Error creating booking:', error.message);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel a booking
  const cancelBooking = async (bookingId) => {
    if (!user) throw new Error('You must be logged in to cancel a booking');
    
    try {
      setIsLoading(true);
      setError(null);
      
      // This would be replaced with actual Supabase query
      // Example of how the actual query would look:
      // const { error } = await supabase
      //   .from('bookings')
      //   .update({ status: 'Cancelled' })
      //   .eq('id', bookingId)
      //   .eq('user_id', user.id);
      
      // if (error) throw error;
      
      // Mock successful cancellation
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'Cancelled' } 
            : booking
        )
      );
      
    } catch (error) {
      console.error('Error cancelling booking:', error.message);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    bookings,
    isLoading,
    error,
    fetchUserBookings,
    createBooking,
    cancelBooking
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

// Mock data for bookings
const mockBookings = [
  {
    id: 1,
    service: 'Portrait Session',
    date: '2023-06-15',
    time: '10:00 AM',
    location: 'Studio',
    status: 'Completed',
    notes: 'Family portrait session with 5 people.'
  },
  {
    id: 2,
    service: 'Event Coverage',
    date: '2023-08-22',
    time: '3:00 PM',
    location: 'Client Location',
    status: 'Completed',
    notes: 'Corporate event photography for company anniversary.'
  },
  {
    id: 3,
    service: 'Wedding Photography',
    date: '2023-11-10',
    time: '12:00 PM',
    location: 'Outdoor',
    status: 'Upcoming',
    notes: 'Full day wedding coverage with second photographer.'
  }
];
