import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

function AdminPhotos() {
  const [photos, setPhotos] = useState([])
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAlbum, setSelectedAlbum] = useState('')
  const [uploading, setUploading] = useState(false)
  const [selectedPhotos, setSelectedPhotos] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const photosPerPage = 12

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    onDrop: acceptedFiles => {
      handleUpload(acceptedFiles)
    }
  })

  useEffect(() => {
    fetchAlbums()
    fetchPhotos()
  }, [page, selectedAlbum, searchQuery])

  const fetchAlbums = async () => {
    try {
      const { data, error } = await supabase
        .from('albums')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAlbums(data || [])
    } catch (error) {
      console.error('Error fetching albums:', error)
      toast.error('Failed to load albums')
    }
  }

  const fetchPhotos = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('photos')
        .select('*, albums(name)', { count: 'exact' })
        .order('created_at', { ascending: false })
      
      // Apply filters if they exist
      if (selectedAlbum) {
        query = query.eq('album_id', selectedAlbum)
      }
      
      if (searchQuery) {
        query = query.ilike('caption', `%${searchQuery}%`)
      }
      
      // Apply pagination
      const from = (page - 1) * photosPerPage
      const to = from + photosPerPage - 1
      
      const { data, count, error } = await query.range(from, to)
      
      if (error) throw error
      
      setPhotos(data || [])
      setTotalPages(Math.ceil((count || 0) / photosPerPage))
    } catch (error) {
      console.error('Error fetching photos:', error)
      toast.error('Failed to load photos')
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (files) => {
    if (!selectedAlbum) {
      toast.error('Please select an album first')
      return
    }

    setUploading(true)
    
    try {
      for (const file of files) {
        // Create a unique file name
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
        const filePath = `photos/${fileName}`
        
        // Upload the file to storage
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file)
        
        if (uploadError) throw uploadError
        
        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from('media')
          .getPublicUrl(filePath)
        
        // Create a thumbnail (in a real app, you might want to resize the image)
        const thumbnailPath = `thumbnails/${fileName}`
        await supabase.storage
          .from('media')
          .upload(thumbnailPath, file)
        
        const { data: thumbnailUrlData } = supabase.storage
          .from('media')
          .getPublicUrl(thumbnailPath)
        
        // Insert the photo record
        const { error: insertError } = await supabase
          .from('photos')
          .insert({
            album_id: selectedAlbum,
            url: publicUrlData.publicUrl,
            thumbnail_url: thumbnailUrlData.publicUrl,
            filename: file.name,
            caption: file.name.split('.')[0].replace(/_/g, ' ')
          })
        
        if (insertError) throw insertError
      }
      
      toast.success('Photos uploaded successfully')
      fetchPhotos()
    } catch (error) {
      console.error('Error uploading photos:', error)
      toast.error('Failed to upload photos')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedPhotos.length === 0) return
    
    if (!confirm(`Are you sure you want to delete ${selectedPhotos.length} photos?`)) {
      return
    }
    
    try {
      // Delete photos from the database
      const { error } = await supabase
        .from('photos')
        .delete()
        .in('id', selectedPhotos)
      
      if (error) throw error
      
      // Note: In a real app, you would also delete the files from storage
      // This would require storing the storage paths in the database
      
      toast.success('Photos deleted successfully')
      setSelectedPhotos([])
      fetchPhotos()
    } catch (error) {
      console.error('Error deleting photos:', error)
      toast.error('Failed to delete photos')
    }
  }

  const togglePhotoSelection = (photoId) => {
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

  const handleUpdateCaption = async (photoId, newCaption) => {
    try {
      const { error } = await supabase
        .from('photos')
        .update({ caption: newCaption })
        .eq('id', photoId)
      
      if (error) throw error
      
      toast.success('Caption updated')
      fetchPhotos()
    } catch (error) {
      console.error('Error updating caption:', error)
      toast.error('Failed to update caption')
    }
  }

  const handleToggleFavorite = async (photoId, currentValue) => {
    try {
      const { error } = await supabase
        .from('photos')
        .update({ is_favorite: !currentValue })
        .eq('id', photoId)
      
      if (error) throw error
      
      toast.success(currentValue ? 'Removed from favorites' : 'Added to favorites')
      fetchPhotos()
    } catch (error) {
      console.error('Error updating favorite status:', error)
      toast.error('Failed to update favorite status')
    }
  }

  const handleMoveToAlbum = async (photoIds, targetAlbumId) => {
    try {
      const { error } = await supabase
        .from('photos')
        .update({ album_id: targetAlbumId })
        .in('id', photoIds)
      
      if (error) throw error
      
      toast.success('Photos moved successfully')
      setSelectedPhotos([])
      fetchPhotos()
    } catch (error) {
      console.error('Error moving photos:', error)
      toast.error('Failed to move photos')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Photo Management</h1>
      
      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Album Filter */}
          <div className="w-full sm:w-64">
            <label htmlFor="album-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Album
            </label>
            <select
              id="album-filter"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              value={selectedAlbum}
              onChange={(e) => setSelectedAlbum(e.target.value)}
            >
              <option value="">All Albums</option>
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Search */}
          <div className="w-full sm:w-64">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Photos
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                id="search"
                className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Search by caption..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <i className="fas fa-search text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Upload Button */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Photos
            </label>
            <div {...getRootProps()} className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
              <div className="space-y-1 text-center">
                <i className="fas fa-cloud-upload-alt text-gray-400 text-3xl"></i>
                <div className="text-sm text-gray-600">
                  <input {...getInputProps()} />
                  <p>Drag & drop or click to select files</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bulk Actions */}
          {selectedPhotos.length > 0 && (
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bulk Actions
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleDeleteSelected}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <i className="fas fa-trash-alt mr-2"></i>
                  Delete ({selectedPhotos.length})
                </button>
                
                {albums.length > 0 && (
                  <div className="relative">
                    <select
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      onChange={(e) => {
                        if (e.target.value) {
                          handleMoveToAlbum(selectedPhotos, e.target.value)
                          e.target.value = ''
                        }
                      }}
                      defaultValue=""
                    >
                      <option value="" disabled>Move to album...</option>
                      {albums.map((album) => (
                        <option key={album.id} value={album.id}>
                          {album.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Photos Grid */}
      {!loading && photos.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <i className="fas fa-images text-gray-400 text-5xl mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900">No photos found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {selectedAlbum 
              ? "Try selecting a different album or upload new photos." 
              : "Upload your first photo by selecting an album and using the upload button above."}
          </p>
        </div>
      )}
      
      {!loading && photos.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="select-all"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                checked={selectedPhotos.length === photos.length && photos.length > 0}
                onChange={handleSelectAll}
              />
              <label htmlFor="select-all" className="ml-2 text-sm text-gray-700">
                Select All
              </label>
            </div>
            <div className="text-sm text-gray-500">
              Showing {photos.length} of {totalPages * photosPerPage} photos
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <div className={`relative rounded-lg overflow-hidden border-2 ${selectedPhotos.includes(photo.id) ? 'border-primary' : 'border-transparent'}`}>
                  <img
                    src={photo.thumbnail_url || photo.url}
                    alt={photo.caption || 'Photo'}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                    <div className="hidden group-hover:flex space-x-2">
                      <button
                        onClick={() => window.open(photo.url, '_blank')}
                        className="p-2 bg-white rounded-full text-gray-800 hover:text-primary"
                        title="View full size"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        onClick={() => {
                          const newCaption = prompt('Enter new caption:', photo.caption)
                          if (newCaption !== null && newCaption !== photo.caption) {
                            handleUpdateCaption(photo.id, newCaption)
                          }
                        }}
                        className="p-2 bg-white rounded-full text-gray-800 hover:text-primary"
                        title="Edit caption"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleToggleFavorite(photo.id, photo.is_favorite)}
                        className={`p-2 bg-white rounded-full ${photo.is_favorite ? 'text-yellow-500' : 'text-gray-800 hover:text-yellow-500'}`}
                        title={photo.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <i className="fas fa-star"></i>
                      </button>
                    </div>
                  </div>
                  
                  {/* Selection checkbox */}
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      checked={selectedPhotos.includes(photo.id)}
                      onChange={() => togglePhotoSelection(photo.id)}
                    />
                  </div>
                  
                  {/* Favorite indicator */}
                  {photo.is_favorite && (
                    <div className="absolute top-2 right-2">
                      <span className="text-yellow-500">
                        <i className="fas fa-star"></i>
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900 truncate" title={photo.caption}>
                    {photo.caption || 'Untitled'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Album: {photo.albums?.name || 'Unknown'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(photo.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    page === 1 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      page === i + 1
                        ? 'z-10 bg-primary text-white border-primary'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    page === totalPages 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </nav>
            </div>
          )}
        </>
      )}
      
      {/* Upload Progress */}
      {uploading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Uploading Photos</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full animate-pulse w-full"></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Please wait while your photos are being uploaded...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPhotos
