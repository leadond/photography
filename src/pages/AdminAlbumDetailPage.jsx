import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function AdminAlbumDetailPage() {
  const { albumId } = useParams()
  const navigate = useNavigate()
  const [album, setAlbum] = useState(null)
  const [photos, setPhotos] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    user_id: '',
    is_published: false,
    session_type: '',
    cover_image: ''
  })
  const [uploadingPhotos, setUploadingPhotos] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedPhotos, setSelectedPhotos] = useState([])

  useEffect(() => {
    const fetchAlbumData = async () => {
      setIsLoading(true)
      try {
        // Fetch album details
        const { data: albumData, error: albumError } = await supabase
          .from('albums')
          .select('*')
          .eq('id', albumId)
          .single()

        if (albumError) throw albumError
        setAlbum(albumData)
        setFormData({
          title: albumData.title || '',
          description: albumData.description || '',
          user_id: albumData.user_id || '',
          is_published: albumData.is_published || false,
          session_type: albumData.session_type || '',
          cover_image: albumData.cover_image || ''
        })

        // Fetch photos in the album
        const { data: photosData, error: photosError } = await supabase
          .from('photos')
          .select('*')
          .eq('album_id', albumId)
          .order('created_at', { ascending: true })

        if (photosError) throw photosError
        setPhotos(photosData || [])

        // Fetch users for assignment
        const { data: usersData, error: usersError } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email')
          .order('first_name', { ascending: true })

        if (usersError) throw usersError
        setUsers(usersData || [])
      } catch (error) {
        console.error('Error fetching album data:', error)
        setError('Failed to load album data')
      } finally {
        setIsLoading(false)
      }
    }

    if (albumId) {
      fetchAlbumData()
    }
  }, [albumId])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const { error } = await supabase
        .from('albums')
        .update({
          title: formData.title,
          description: formData.description,
          user_id: formData.user_id || null,
          is_published: formData.is_published,
          session_type: formData.session_type,
          cover_image: formData.cover_image,
          updated_at: new Date().toISOString()
        })
        .eq('id', albumId)

      if (error) throw error

      // Update local state
      setAlbum(prev => ({
        ...prev,
        ...formData,
        updated_at: new Date().toISOString()
      }))

      setIsEditing(false)
      toast.success('Album updated successfully')
    } catch (error) {
      console.error('Error updating album:', error)
      setError('Failed to update album')
      toast.error('Failed to update album')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setUploadingPhotos(true)
    setUploadProgress(0)
    
    try {
      const totalFiles = files.length
      let completedFiles = 0
      const uploadedPhotos = []

      for (const file of files) {
        // Upload file to storage
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
        const filePath = `albums/${albumId}/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('photos')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('photos')
          .getPublicUrl(filePath)

        // Create photo record
        const { data: photoData, error: photoError } = await supabase
          .from('photos')
          .insert([
            {
              album_id: albumId,
              url: urlData.publicUrl,
              filename: file.name,
              file_size: file.size,
              file_type: file.type,
              created_at: new Date().toISOString()
            }
          ])
          .select()

        if (photoError) throw photoError
        
        uploadedPhotos.push(photoData[0])
        completedFiles++
        setUploadProgress(Math.round((completedFiles / totalFiles) * 100))
      }

      // Update photos state
      setPhotos(prev => [...prev, ...uploadedPhotos])
      
      // Update album photo count
      const { error: updateError } = await supabase
        .from('albums')
        .update({
          photo_count: photos.length + uploadedPhotos.length,
          updated_at: new Date().toISOString()
        })
        .eq('id', albumId)

      if (updateError) throw updateError

      // Update album state
      setAlbum(prev => ({
        ...prev,
        photo_count: photos.length + uploadedPhotos.length,
        updated_at: new Date().toISOString()
      }))

      toast.success(`Successfully uploaded ${files.length} photos`)
    } catch (error) {
      console.error('Error uploading photos:', error)
      toast.error('Failed to upload photos')
    } finally {
      setUploadingPhotos(false)
      setUploadProgress(0)
    }
  }

  const togglePhotoSelection = (photoId) => {
    setSelectedPhotos(prev => 
      prev.includes(photoId)
        ? prev.filter(id => id !== photoId)
        : [...prev, photoId]
    )
  }

  const deleteSelectedPhotos = async () => {
    if (selectedPhotos.length === 0) return
    
    if (!confirm(`Are you sure you want to delete ${selectedPhotos.length} selected photos? This action cannot be undone.`)) {
      return
    }

    try {
      // Delete photo records
      const { error } = await supabase
        .from('photos')
        .delete()
        .in('id', selectedPhotos)

      if (error) throw error

      // Update photos state
      setPhotos(prev => prev.filter(photo => !selectedPhotos.includes(photo.id)))
      
      // Update album photo count
      const newPhotoCount = photos.length - selectedPhotos.length
      const { error: updateError } = await supabase
        .from('albums')
        .update({
          photo_count: newPhotoCount,
          updated_at: new Date().toISOString()
        })
        .eq('id', albumId)

      if (updateError) throw updateError

      // Update album state
      setAlbum(prev => ({
        ...prev,
        photo_count: newPhotoCount,
        updated_at: new Date().toISOString()
      }))

      setSelectedPhotos([])
      toast.success(`Successfully deleted ${selectedPhotos.length} photos`)
    } catch (error) {
      console.error('Error deleting photos:', error)
      toast.error('Failed to delete photos')
    }
  }

  const setAsCoverImage = async (photoUrl) => {
    try {
      const { error } = await supabase
        .from('albums')
        .update({
          cover_image: photoUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', albumId)

      if (error) throw error

      // Update album state and form data
      setAlbum(prev => ({
        ...prev,
        cover_image: photoUrl,
        updated_at: new Date().toISOString()
      }))
      
      setFormData(prev => ({
        ...prev,
        cover_image: photoUrl
      }))

      toast.success('Cover image updated')
    } catch (error) {
      console.error('Error updating cover image:', error)
      toast.error('Failed to update cover image')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  if (error && !album) {
    return (
      <div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error || 'Album not found'}
        </div>
        <Link to="/admin/albums" className="text-amber-500 hover:text-amber-600">
          &larr; Back to Albums
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <Link to="/admin/albums" className="text-amber-500 hover:text-amber-600 mb-4 inline-block">
          &larr; Back to Albums
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold mb-2 md:mb-0">
            {isEditing ? 'Edit Album' : album.title}
          </h1>
          {!isEditing && (
            <div className="flex space-x-3">
              <button 
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition"
              >
                <i className="fas fa-edit mr-2"></i> Edit Album
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Album Details Form */}
      {isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="title" className="block text-gray-700 mb-2">Album Title</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="session_type" className="block text-gray-700 mb-2">Session Type</label>
                <input 
                  type="text" 
                  id="session_type" 
                  name="session_type"
                  value={formData.session_type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" 
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
              <textarea 
                id="description" 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" 
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="user_id" className="block text-gray-700 mb-2">Assign to Client</label>
                <select 
                  id="user_id" 
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" 
                >
                  <option value="">-- Select Client --</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} {user.last_name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cover_image" className="block text-gray-700 mb-2">Cover Image URL</label>
                <input 
                  type="text" 
                  id="cover_image" 
                  name="cover_image"
                  value={formData.cover_image}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" 
                />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="is_published" 
                  name="is_published"
                  checked={formData.is_published}
                  onChange={handleChange}
                  className="mr-2" 
                />
                <label htmlFor="is_published" className="text-gray-700">Publish Album (visible to client)</label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="mb-4">
                <h3 className="text-gray-500 text-sm">Album Details</h3>
                <p className="text-gray-700">{album.description || 'No description provided'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-gray-500 text-sm">Session Type</h3>
                  <p className="text-gray-700">{album.session_type || 'Not specified'}</p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm">Created</h3>
                  <p className="text-gray-700">
                    {new Date(album.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm">Status</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    album.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {album.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm">Photos</h3>
                  <p className="text-gray-700">{photos.length}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-gray-500 text-sm mb-2">Client</h3>
              {album.user_id ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  {users.find(user => user.id === album.user_id) ? (
                    <>
                      <p className="font-medium">
                        {users.find(user => user.id === album.user_id)?.first_name} {users.find(user => user.id === album.user_id)?.last_name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {users.find(user => user.id === album.user_id)?.email}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-600">Client information not available</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-600">No client assigned</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Photo Management */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-bold mb-2 md:mb-0">Photos ({photos.length})</h2>
          <div className="flex flex-col md:flex-row gap-3">
            {selectedPhotos.length > 0 && (
              <button 
                onClick={deleteSelectedPhotos}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition"
              >
                Delete Selected ({selectedPhotos.length})
              </button>
            )}
            <label className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition cursor-pointer">
              <i className="fas fa-upload mr-2"></i> Upload Photos
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handlePhotoUpload}
                className="hidden" 
              />
            </label>
          </div>
        </div>

        {uploadingPhotos && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span>Uploading photos...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-amber-500 h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div 
                key={photo.id} 
                className={`relative group rounded-lg overflow-hidden border ${
                  selectedPhotos.includes(photo.id) ? 'border-amber-500 ring-2 ring-amber-500' : 'border-gray-200'
                }`}
              >
                <div className="absolute top-2 left-2 z-10">
                  <input 
                    type="checkbox" 
                    checked={selectedPhotos.includes(photo.id)}
                    onChange={() => togglePhotoSelection(photo.id)}
                    className="w-4 h-4"
                  />
                </div>
                <img 
                  src={photo.url} 
                  alt={photo.caption || 'Photo'} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setAsCoverImage(photo.url)}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition"
                      title="Set as cover image"
                    >
                      <i className="fas fa-image text-gray-700"></i>
                    </button>
                  </div>
                </div>
                {album.cover_image === photo.url && (
                  <div className="absolute bottom-0 left-0 right-0 bg-amber-500 text-white text-xs text-center py-1">
                    Cover Image
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-images text-gray-400 text-xl"></i>
            </div>
            <h3 className="text-lg font-medium mb-2">No Photos Yet</h3>
            <p className="text-gray-600 mb-4">Upload photos to this album using the button above.</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default AdminAlbumDetailPage
