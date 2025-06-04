import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video } from '../context/SearchContext';

interface VideoCardProps {
  video: Video;
  index: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Format view count
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    } else {
      return `${views} views`;
    }
  };

  // Format date to relative time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      return `${Math.floor(diffInDays / 7)} weeks ago`;
    } else if (diffInDays < 365) {
      return `${Math.floor(diffInDays / 30)} months ago`;
    } else {
      return `${Math.floor(diffInDays / 365)} years ago`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/video/${video.id}`} className="block">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{video.title}</h3>
          <p className="text-gray-500 text-sm mb-2">
            {formatViews(video.views)} • {formatDate(video.createdAt)}
          </p>
          <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {video.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default VideoCard;
