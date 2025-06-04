import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSearch } from '../context/SearchContext';
import VideoPlayer from '../components/VideoPlayer';
import RelatedVideos from '../components/RelatedVideos';
import { Video } from '../context/SearchContext';

const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { videos, searchVideos } = useSearch();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we don't have videos in context, search for some
    if (videos.length === 0) {
      searchVideos('how to');
    }
    
    // Find the video by ID
    const foundVideo = videos.find(v => v.id === id);
    if (foundVideo) {
      setVideo(foundVideo);
      setLoading(false);
      // Update document title
      document.title = `${foundVideo.title} | VideoFinder`;
    } else if (videos.length > 0) {
      // If we have videos but can't find this one, redirect to 404
      navigate('/not-found');
    }
  }, [id, videos]);

  // Reset title when component unmounts
  useEffect(() => {
    return () => {
      document.title = 'VideoFinder - Find How-To Videos';
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Video Not Found</h2>
          <p className="text-gray-600 mb-4">The video you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <VideoPlayer video={video} autoplay={true} />
            
            {/* Video Info */}
            <div className="mt-6">
              <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <span className="mr-4">{video.views.toLocaleString()} views</span>
                <span>{new Date(video.createdAt).toLocaleDateString()}</span>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {video.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Description */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{video.description}</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn btn-primary flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Save
              </button>
              <button className="btn btn-outline flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
              <button className="btn btn-outline flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Report
              </button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Video Source Info (restricted) */}
              <div className="card p-4 mb-6">
                <h3 className="font-semibold mb-2">About This Video</h3>
                <p className="text-gray-600 text-sm mb-3">
                  This video is embedded from {video.source} and is displayed here for educational purposes.
                </p>
                <div className="text-xs text-gray-500">
                  <p>Category: {video.category}</p>
                  <p>Duration: {video.duration}</p>
                </div>
              </div>
              
              {/* Similar Searches */}
              <div className="card p-4">
                <h3 className="font-semibold mb-3">Similar Searches</h3>
                <div className="space-y-2">
                  {video.tags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        searchVideos(tag);
                        navigate('/search');
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm"
                    >
                      How to {tag}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      searchVideos(video.category);
                      navigate('/search');
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm"
                  >
                    Best {video.category.toLowerCase()} tutorials
                  </button>
                  <button
                    onClick={() => {
                      searchVideos(`${video.category} for beginners`);
                      navigate('/search');
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm"
                  >
                    {video.category} for beginners
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Videos */}
        <RelatedVideos currentVideo={video} allVideos={videos} />
      </div>
    </motion.div>
  );
};

export default VideoPage;
