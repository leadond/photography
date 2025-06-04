import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Album } from '../context/GalleryContext'

interface AlbumCardProps {
  album: Album
  index: number
  userAlbum?: boolean
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, index, userAlbum = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={userAlbum ? `/my-albums/${album.id}` : `/gallery/${album.id}`}>
        <div className="overflow-hidden rounded-lg shadow-md bg-white">
          <div className="relative h-64 overflow-hidden">
            <img 
              src={album.cover_image} 
              alt={album.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-medium text-xl">{album.title}</h3>
              <p className="text-gray-200 text-sm">{album.photo_count} photos</p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 text-sm line-clamp-2">{album.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(album.created_at).toLocaleDateString()}
              </span>
              <span className="text-primary-600 font-medium text-sm group-hover:underline">
                View Album
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default AlbumCard
