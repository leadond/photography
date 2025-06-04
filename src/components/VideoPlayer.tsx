import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Video } from '../context/SearchContext';

interface VideoPlayerProps {
  video: Video;
  autoplay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, autoplay = false }) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Add autoplay parameter to embed URL if needed
  const embedUrl = autoplay 
    ? `${video.embedUrl}?autoplay=1&mute=1` 
    : video.embedUrl;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // This function enables pointer events only when controls are being used
  const enableInteraction = () => {
    if (containerRef.current) {
      containerRef.current.classList.add('active');
      
      // Disable interaction after 3 seconds of inactivity
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.classList.remove('active');
        }
      }, 3000);
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`video-container relative rounded-lg overflow-hidden shadow-xl ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}
      onMouseMove={enableInteraction}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={`w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
        ></iframe>
      </div>
      
      {/* Custom controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>
            
            <div className="text-white text-sm">{video.duration}</div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleFullscreen}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M15 9H19.5M15 9V4.5M15 15V19.5M15 15H19.5M9 15H4.5M9 15V19.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Reminder about source restriction */}
      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        Embedded content
      </div>
    </motion.div>
  );
};

export default VideoPlayer;
