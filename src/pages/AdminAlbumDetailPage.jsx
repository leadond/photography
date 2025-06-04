import { useEffect, useState, useRef } from 'react'
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
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    user_id: '',
    download_url: ''
  })
  const fileInputRef = useRef(null)
  const [selectedPhotos, setSelectedPhotos] = useState([])
  const [coverPhotoId, setCoverPhotoId] = useState(null)

  useEffect(() => {
    fetchAlbumDetails()
    fetchUsers()
  }, [albumId])

  const fetchAlbumDetails = async () => {
    try {
      setLoading(true)
      
      if (albumId === 'new') {
        setAlbum(null)
        setPhotos([])
        return
      }
      
      // Fetch album details
      const { data: albumData, error: albumError } = await supabase
        .from('albums')
        .select('*')
        .eq('id', albumId)
        .single()

      if (albumError) throw albumError
      setAlbum(albumData)
      setFormData({
        title: albumData.title,
        description: albumData.description || '',
        user_id: albumData.user_id,
        download_url: albumData.download_url || ''
      })

      // Fetch photos in the album
      const { data: photosData, error: photosError } = await supabase
        .from('photos')
        .select('*')
        .eq('album_id', albumId)
        .order('created_at', { ascending: true })

      if (photosError) throw photosError
      setPhotos(photosData || [])
      
      // Find cover photo
      const coverPhoto = photosData?.find(photo => photo.url === albumData.cover_image)
      if (coverPhoto) {
        setCoverPhotoId(coverPhoto.id)
      }
    } catch (error) {
      console.error('Error fetching album details:', error)
      toast.error('Failed to load album details')
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .order('full_name', { ascending: true })
      
      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Failed to load users')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      
      // Validate form
      if (!formData.title || !formData.user_id) {
        toast.error('Please fill in all required fields')
        return
      }
      
      // Determine cover image
      let coverImage = album?.cover_image
      if (coverPhotoId) {
        const coverPhoto = photos.find(photo => photo.id === coverPhotoId)
        if (coverPhoto) {
          coverImage = coverPhoto.url
        }
      }
      
      const albumData = {
        ...formData,
        cover_image: coverImage,
        photo_count: photos.length,
        updated_at: new Date().toISOString()
      }
      
      let result
      
      if (albumId === 'new') {
        // Create new album
        result = await supabase
          .from('albums')
          .insert([albumData])
          .select()
      } else {
        // Update existing album
        result = await supabase
          .from('albums')
          .update(albumData)
          .eq('id', albumId)
          .select()
      }
      
      if (result.error) throw result.error
      
      toast.success(albumId === 'new' ? 'Album created successfully' : 'Album updated successfully')
      
      if (albumId === 'new' && result.data?.[0]) {
        navigate(`/admin/albums/${result.data[0].id}`)
      } else {
        setAlbum({
          ...album,
          ...albumData
        })
        setEditing(false)
      }
    } catch (error) {
      console.error('Error saving album:', error)
      toast.error('Failed to save album')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    try {
      setUploading(true)
      
      if (!album && albumId === 'new') {
        toast.error('Please save the album before uploading photos')
        return
      }
      
      const uploadPromises = Array.from(files).map(async (file) => {
        // Create a unique file name
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
        const filePath = `albums/${albumId}/${fileName}`
        
        // Upload file to storage
        const { error: uploadError } = await supabase.storage
          .from('photos')
          .upload(filePath, file)
        
        if (uploadError) throw uploadError
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('photos')
          .getPublicUrl(filePath)
        
        // Create photo record in database
        const { data, error } = await supabase
          .from('photos')
          .insert([{
            album_id: albumId,
            url: publicUrl,
            filename: file.name,
            caption: '',
            is_favorite: false
          }])
          .select()
        
        if (error) throw error
        
        return data[0]
      })
      
      const newPhotos = await Promise.all(uploadPromises)
      
      // Update photos state
      setPhotos([...photos, ...newPhotos])
      
      // Update album photo count
      await supabase
        .from('albums')
        .update({ 
          photo_count: photos.length + newPhotos.length,
          updated_at: new Date().toISOString()
        })
        .eq('id', albumId)
      
      toast.success(`${files.length} photos uploaded successfully`)
      
      // Set first uploaded photo as cover if no cover exists
      if (!album.cover_image && newPhotos.length > 0) {
        await supabase
          .from('albums')
          .update({ 
            cover_image: newPhotos[0].url,
            updated_at: new Date().toISOString()
          })
          .eq('id', albumId)
        
        setAlbum({
          ...album,
          cover_image: newPhotos[0].url
        })
        
        setCoverPhotoId(newPhotos[0].id)
      }
      
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error uploading photos:', error)
      toast.error('Failed to upload photos')
    } finally {
      setUploading(false)
    }
  }

  const handlePhotoSelect = (photoId) => {
    setSelectedPhotos(prev => {
      if (prev.includes(photoId)) {
        return prev.filter(id => id !== photoId)
      } else {
        return [...prev, photoId]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedPhotos.length === photos.length) {
      setSelectedPhotos([])
    } else {
      setSelectedPhotos(photos.map(photo => photo.id))
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedPhotos.length === 0) return
    
    if (!window.confirm(`Are you sure you want to delete ${selectedPhotos.length} selected photos? This action cannot be undone.`)) {
      return
    }
    
    try {
      setLoading(true)
      
      // Delete photos from database
      const { error } = await supabase
        .from('photos')
        .delete()
        .in('id', selectedPhotos)
      
      if (error) throw error
      
      // Update photos state
      const remainingPhotos = photos.filter(photo => !selectedPhotos.includes(photo.id))
      setPhotos(remainingPhotos)
      
      // Update album photo count
      await supabase
        .from('albums')
        .update({ 
          photo_count: remainingPhotos.length,
          updated_at: new Date().toISOString()
        })
        .eq('id', albumId)
      
      // If cover photo was deleted, update album cover
      if (selectedPhotos.includes(coverPhotoId)) {
        const newCoverPhoto = remainingPhotos[0]
        if (newCoverPhoto) {
          await supabase
            .from('albums')
            .update({ 
              cover_image: newCoverPhoto.url,
              updated_at: new Date().toISOString()
            })
            .eq('id', albumId)
          
          setAlbum({
            ...album,
            cover_image: newCoverPhoto.url
          })
          
          setCoverPhotoId(newCoverPhoto.id)
        } else {
          await supabase
            .from('albums')
            .update({ 
              cover_image: null,
              updated_at: new Date().toISOString()
            })
            .eq('id', albumId)
          
          setAlbum({
            ...album,
            cover_image: null
          })
          
          setCoverPhotoId(null)
        }
      }
      
      setSelectedPhotos([])
      toast.success(`${selectedPhotos.length} photos deleted successfully`)
    } catch (error) {
      console.error('Error deleting photos:', error)
      toast.error('Failed to delete photos')
    } finally {
      setLoading(false)
    }
  }

  const handleSetCover = async (photoId) => {
    try {
      const photo = photos.find(p => p.id === photoId)
      if (!photo) return
      
      await supabase
        .from('albums')
        .update({ 
          cover_image: photo.url,
          updated_at: new Date().toISOString()
        })
        .eq('id', albumId)
      
      setAlbum({
        ...album,
        cover_image: photo.url
      })
      
      setCoverPhotoId(photoId)
      toast.success('Cover photo updated')
    } catch (error) {
      console.error('Error setting cover photo:', error)
      toast.error('Failed to set cover photo')
    }
  }

  const handleUpdateCaption = async (photoId, caption) => {
    try {
      const { error } = await supabase
        .from('photos')
        .update({ caption })
        .eq('id', photoId)
      
      if (error) throw error
      
      setPhotos(photos.map(photo => 
        photo.id === photoId ? { ...photo, caption } : photo
      ))
      
      toast.success('Caption updated')
    } catch (error) {
      console.error('Error updating caption:', error)
      toast.error('Failed to update caption')
    }
  }

  if (loading && !album && albumId !== 'new') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
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
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              {albumId === 'new' ? 'Create New Album' : `Album: ${album?.title}`}
            </h1>
            <div className="flex space-x-3">
              <Link
                to="/admin/albums"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Back to Albums
              </Link>
              {album && !editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Edit Album
                </button>
              )}
            </div>
          </div>
          
          {/* Album Form */}
          {(albumId === 'new' || editing) && (
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Album Title *
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                        Client *
                      </label>
                      <div className="mt-1">
                        <select
                          id="user_id"
                          name="user_id"
                          value={formData.user_id}
                          onChange={handleChange}
                          required
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select a client</option>
                          {users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.full_name || user.email}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          value={formData.description}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="download_url" className="block text-sm font-medium text-gray-700">
                        Download URL
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="download_url"
                          id="download_url"
                          value={formData.download_url}
                          onChange={handleChange}
                          placeholder="https://example.com/download"
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Optional link for clients to download all photos at once
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (albumId === 'new') {
                          navigate('/admin/albums')
                        } else {
                          setEditing(false)
                          setFormData({
                            title: album.title,
                            description: album.description || '',
                            user_id: album.user_id,
                            download_url: album.download_url || ''
                          })
                        }
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      {loading ? 'Saving...' : 'Save Album'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Album Details */}
          {album && !editing && (
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Album Details</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                    <dd className="mt-1 text-sm text-gray-900">{album.title}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Client</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {users.find(u => u.id === album.user_id)?.full_name || 
                       users.find(u => u.id === album.user_id)?.email || 
                       'Unknown'}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(album.created_at).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Photos</dt>
                    <dd className="mt-1 text-sm text-gray-900">{album.photo_count || 0}</dd>
                  </div>
                  {album.description && (
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Description</dt>
                      <dd className="mt-1 text-sm text-gray-900">{album.description}</dd>
                    </div>
                  )}
                  {album.download_url && (
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Download URL</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <a 
                          href={album.download_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-900"
                        >
                          {album.download_url}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          )}
          
          {/* Photo Management */}
          {album && !editing && (
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Photos</h2>
                <div className="flex space-x-3">
                  {selectedPhotos.length > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete Selected ({selectedPhotos.length})
                    </button>
                  )}
                  <button
                    onClick={handleSelectAll}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {selectedPhotos.length === photos.length ? 'Deselect All' : 'Select All'}
                  </button>
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer"
                  >
                    {uploading ? 'Uploading...' : 'Upload Photos'}
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="sr-only"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>
              
              <div className="mt-4">
                {photos.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {photos.map((photo) => (
                      <div 
                        key={photo.id} 
                        className={`relative group overflow-hidden rounded-lg shadow-md ${
                          selectedPhotos.includes(photo.id) ? 'ring-2 ring-primary-500' : ''
                        }`}
                      >
                        <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                          <img 
                            src={photo.url} 
                            alt={photo.caption || 'Photo'} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Selection overlay */}
                        <div 
                          className="absolute top-2 left-2 z-10"
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePhotoSelect(photo.id)
                          }}
                        >
                          <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                            selectedPhotos.includes(photo.id) 
                              ? 'bg-primary-500 border-primary-500' 
                              : 'border-white bg-opacity-50 bg-gray-500'
                          }`}>
                            {selectedPhotos.includes(photo.id) && (
                              <i className="fas fa-check text-white text-xs"></i>
                            )}
                          </div>
                        </div>
                        
                        {/* Cover badge */}
                        {photo.id === coverPhotoId && (
                          <div className="absolute top-2 right-2 z-10">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                              Cover
                            </span>
                          </div>
                        )}
                        
                        {/* Actions overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                            {photo.id !== coverPhotoId && (
                              <button 
                                onClick={() => handleSetCover(photo.id)}
                                className="bg-white p-2 rounded-full text-gray-800 hover:text-primary-600 focus:outline-none"
                                title="Set as cover"
                              >
                                <i className="fas fa-star text-sm"></i>
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                const caption = prompt('Enter caption for this photo:', photo.caption || '')
                                if (caption !== null) {
                                  handleUpdateCaption(photo.id, caption)
                                }
                              }}
                              className="bg-white p-2 rounded-full text-gray-800 hover:text-primary-600 focus:outline-none"
                              title="Edit caption"
                            >
                              <i className="fas fa-edit text-sm"></i>
                            </button>
                            <a 
                              href={photo.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-white p-2 rounded-full text-gray-800 hover:text-primary-600 focus:outline-none"
                              title="View full size"
                            >
                              <i className="fas fa-external-link-alt text-sm"></i>
                            </a>
                          </div>
                        </div>
                        
                        {/* Caption */}
                        {photo.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-xs truncate">
                            {photo.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:p-6 text-center">
                      <p className="text-gray-500">No photos in this album yet.</p>
                      <label
                        htmlFor="file-upload-empty"
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer"
                      >
                        Upload Photos
                        <input
                          id="file-upload-empty"
                          name="file-upload-empty"
                          type="file"
                          multiple
                          accept="image/*"
                          className="sr-only"
                          onChange={handleFileUpload}
                          disabled={uploading}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* New Album Instructions */}
          {albumId === 'new' && (
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Creating a New Album</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Fill in the album details above and save to create a new album. After creating the album, you'll be able to upload photos.
                  </p>
                </div>
                <div className="mt-5">
                  <div className="rounded-md bg-gray-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <i className="fas fa-info-circle text-primary-400"></i>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-800">Tips for creating albums</h3>
                        <div className="mt-2 text-sm text-gray-700">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Use descriptive titles that include the client name and session type</li>
                            <li>Add a detailed description to help clients understand the content</li>
                            <li>You can upload photos after saving the album</li>
                            <li>The first uploaded photo will automatically become the album cover</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default AdminAlbumDetailPage
