import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TextReveal from './TextReveal'

const heroSlides = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Capture Your Special Moments',
    subtitle: 'Professional photography services for graduations, family portraits, and more.'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Family Portraits That Tell Your Story',
    subtitle: 'Preserve your family memories with beautiful, timeless photography.'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/5325840/pexels-photo-5325840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Corporate Events & Professional Headshots',
    subtitle: 'Elevate your brand with high-quality corporate photography.'
  }
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setIsTransitioning(false)
      }, 500)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [heroSlides.length])
  
  return (
    <section className="relative h-screen">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/70"></div>
        </div>
      ))}
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        <motion.img 
          src="/logos/logo-d-gold.svg" 
          alt="DXM Productions" 
          className="h-24 w-auto mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="h-24 mb-6 flex items-center justify-center">
          {heroSlides.map((slide, index) => (
            <motion.h1
              key={slide.id}
              className={`text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-serif ${
                index === currentSlide ? 'block' : 'hidden'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: index === currentSlide ? 1 : 0,
                y: index === currentSlide ? 0 : 20
              }}
              transition={{ duration: 0.5 }}
            >
              {slide.title}
            </motion.h1>
          ))}
        </div>
        
        <div className="h-16 mb-8">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`max-w-3xl mx-auto ${
                index === currentSlide ? 'block' : 'hidden'
              }`}
            >
              <TextReveal 
                text={slide.subtitle}
                className="text-xl text-white"
                speed={30}
                key={slide.id}
              />
            </div>
          ))}
        </div>
        
        <motion.div
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            to="/gallery"
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            View Gallery
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white bg-transparent hover:bg-white hover:text-primary-600 transition-colors"
          >
            Book a Session
          </Link>
        </motion.div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-0 right-0">
          <div className="flex justify-center space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary-500 w-8' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
