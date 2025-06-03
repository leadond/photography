import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

// Create a simple DownloadIcon component to replace the missing import
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
)

interface Photo {
  id: string
  url: string
  thumbnail_url: string
  title: string
  description: string
  created_at: string
  appointment_id: string
}

interface Appointment {
  id: string
  date: string
  package: {
    name: string
  }
}

interface PackageData {
  name: string | null
}

interface AppointmentData {
  id: string
  date: string
  package: PackageData | null
}

const MyPhotosPage = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null)
  const [appointmentPhotos, setAppointmentPhotos] = useState<Photo[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  
  // Mock data for demonstration purposes
  const mockAppointments = [
    {
      id: '1',
      date: '2023-06-15',
      package: { name: 'Family Portrait Session' }
    },
    {
      id: '2',
      date: '2023-07-22',
      package: { name: 'Graduation Photoshoot' }
    },
    {
      id: '3',
      date: '2023-08-10',
      package: { name: 'Corporate Headshots' }
    }
  ]
  
  const mockPhotos = {
    '1': [
      {
        id: '101',
        url: 'https://images.pexels.com/photos/8101622/pexels-photo-8101622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        thumbnail_url: 'https://images.pexels.com/photos/8101622/pexels-photo-8101622.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        title: 'Family Portrait 1',
        description: 'Family portrait session at the park',
        created_at: '2023-06-15T14:30:00Z',
        appointment_id: '1'
      },
      {
        id: '102',
        url: 'https://images.pexels.com/photos/3876394/pexels-photo-3876394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        thumbnail_url: 'https://images.pexels.com/photos/3876394/pexels-photo-3876394.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        title: 'Family Portrait 2',
        description: 'Candid family moment',
        created_at: '2023-06-15T14:45:00Z',
        appointment_id: '1'
      },
      {
        id: '103',
        url: 'https://images.pexels.com/photos/1974521/pexels-photo-1974521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        thumbnail_url: 'https://images.pexels.com/photos/1974521/pexels-photo-1974521.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        title: 'Family Portrait 3',
        description: 'Group family photo',
        created_at: '2023-06-15T15:00:00Z',
        appointment_id: '1'
      }
    ],
    '2': [
      {
        id: '201',
        url: 'https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        thumbnail_url: 'https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        title: 'Graduation 1',
        description: 'Graduation ceremony portrait',
        created_at: '2023-07-22T10:30:00Z',
        appointment_id: '2'
      },
      {
        id: '202',
        url: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        thumbnail_url: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        title: 'Graduation 2',
        description: 'Cap toss celebration',
        created_at: '2023-07-22T11:00:00Z',
        appointment_id: '2'
      },
      {
        id: '203',
        url: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        thumbnail_url: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        title: 'Graduation 3',
        description: 'Diploma portrait',
        created_at: '2023-07-22T11:30:00Z',
        appointment_id: '2'
      }
    ],
    '3': [
      {
        id: '301',
        url: 'https://images.pexels.com/photos/5325840/pexels-photo-5325840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        thumbnail_url: 'https://images.pexels.com/photos/5325840/pexels-photo-5325840.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        title: 'Corporate Headshot 1',
        description: 'Professional portrait on white background',
        created_at: '2023-08-10T09:30:00Z',
        appointment_id: '3'
      },
      {
        id: '302',
        url: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        thumbnail_url: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        title: 'Corporate Headshot 2',
        description: 'Professional portrait with natural lighting',
        created_at: '2023-08-10T10:00:00Z',
        appointment_id: '3'
      },
      {
        id: '303',
        url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        thumbnail_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        title: 'Corporate Headshot 3',
        description: 'Professional portrait for LinkedIn',
        created_at: '2023-08-10T10:30:00Z',
        appointment_id: '3'
      }
    ]
  }
  
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return
      
      try {
        // For demo purposes, we'll use mock data instead of actual Supabase calls
        // In a real app, you would use the commented out code below
        /*
        const { data, error } = await supabase
          .from('appointments')
          .select(`
            id,
            date,
            package:packages(name)
          `)
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .order('date', { ascending: false })
        
        if (error) throw error
        */
        
        // Using mock data
        setAppointments(mockAppointments)
        setSelectedAppointment(mockAppointments[0].id)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching appointments:', error)
        toast.error('Failed to load your appointments')
        setLoading(false)
      }
    }
    
    fetchAppointments()
  }, [user])
  
  useEffect(() => {
    const fetchPhotos = async () => {
      if (!selectedAppointment) return
      
      try {
        setLoading(true)
        
        // For demo purposes, we'll use mock data instead of actual Supabase calls
        // In a real app, you would use the commented out code below
        /*
        const { data, error } = await supabase
          .from('photos')
          .select('*')
          .eq('appointment_id', selectedAppointment)
          .order('created_at', { ascending: false })
        
        if (error) throw error
        */
        
        // Using mock data
        setAppointmentPhotos(mockPhotos[selectedAppointment as keyof typeof mockPhotos] || [])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching photos:', error)
        toast.error('Failed to load photos')
        setLoading(false)
      }
    }
    
    fetchPhotos()
  }, [selectedAppointment])
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  const handleAppointmentChange = (appointmentId: string) => {
    setSelectedAppointment(appointmentId)
    setSelectedPhoto(null)
  }
  
  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo)
  }
  
  const handleCloseModal = () => {
    setSelectedPhoto(null)
  }
  
  const handleDownload = (url: string) => {
    // In a real app, you would handle the download properly
    // For this demo, we'll just open the image in a new tab
    window.open(url, '_blank')
    toast.success('Download started')
  }
  
  if (loading && appointments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  if (appointments.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-4">No Photos Available</h1>
        <p className="text-gray-600 mb-6">
          You don't have any completed photography sessions yet. Photos will appear here after your session is completed.
        </p>
        <button
          onClick={() => window.location.href = '/dashboard/booking'}
          className="px-6 py-3 bg-primary-600 text-white font-medium rounded-md shadow-sm hover:bg-primary-700"
        >
          Book a Session
        </button>
      </div>
    )
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Photos</h1>
        <p className="text-gray-600">
          View and download photos from your completed photography sessions.
        </p>
      </div>
      
      {/* Session selector */}
      <div className="mb-8">
        <label htmlFor="session" className="block text-gray-700 font-medium mb-2">
          Select Session
        </label>
        <select
          id="session"
          value={selectedAppointment || ''}
          onChange={(e) => handleAppointmentChange(e.target.value)}
          className="block w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
        >
          {appointments.map((appointment) => (
            <option key={appointment.id} value={appointment.id}>
              {appointment.package.name} - {formatDate(appointment.date)}
            </option>
          ))}
        </select>
      </div>
      
      {/* Photo grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : appointmentPhotos.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <h2 className="text-xl font-bold mb-2">No Photos Available</h2>
          <p className="text-gray-600">
            There are no photos available for this session yet. Photos are typically available 7-10 business days after your session.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {appointmentPhotos.map((photo) => (
            <div 
              key={photo.id}
              className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform hover:shadow-lg hover:-translate-y-1"
              onClick={() => handlePhotoClick(photo)}
            >
              <div className="aspect-w-3 aspect-h-2">
                <img 
                  src={photo.thumbnail_url || photo.url} 
                  alt={photo.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 truncate">{photo.title}</h3>
                <p className="text-gray-500 text-sm truncate">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Photo modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-lg">{selectedPhoto.title}</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.title} 
                className="max-w-full max-h-[60vh] mx-auto"
              />
              
              <div className="mt-4">
                <p className="text-gray-700">{selectedPhoto.description}</p>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => handleDownload(selectedPhoto.url)}
                className="flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-md shadow-sm hover:bg-primary-700"
              >
                <DownloadIcon />
                <span className="ml-2">Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyPhotosPage
