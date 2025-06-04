import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video } from '../context/SearchContext';
import VideoCard from './VideoCard';

interface RelatedVideosProps {
  currentVideo: Video;
  allVideos: Video[];
}

const RelatedVideos: React.FC<RelatedVideosProps> = ({ currentVideo, allVideos }) => {
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Filter out the current video and find related videos based on tags or category
    const filtered = allVideos
      .filter(video => video.id !== currentVideo.id)
      .sort((a, b) => {
        // Calculate relevance score based on matching tags and category
        const aScore = calculateRelevanceScore(a, currentVideo);
        const bScore = calculateRelevanceScore(b, currentVideo);
        return bScore - aScore;
      })
      .slice(0, 4); // Limit to 4 related videos
    
    setRelatedVideos(filtered);
  }, [currentVideo, allVideos]);

  // Calculate how relevant a video is to the current video
  const calculateRelevanceScore = (video: Video, currentVideo: Video): number => {
    let score = 0;
    
    // Match by category
    if (video.category === currentVideo.category) {
      score += 5;
    }
    
    // Match by tags
    const matchingTags = video.tags.filter(tag => 
      currentVideo.tags.includes(tag)
    );
    score += matchingTags.length * 2;
    
    // Match by title keywords
    const currentVideoWords = currentVideo.title.toLowerCase().split(' ');
    const videoWords = video.title.toLowerCase().split(' ');
    const matchingWords = videoWords.filter(word => 
      currentVideoWords.includes(word) && word.length > 3
    );
    score += matchingWords.length;
    
    return score;
  };

  if (relatedVideos.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Related Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedVideos.map((video, index) => (
          <VideoCard key={video.id} video={video} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RelatedVideos;
