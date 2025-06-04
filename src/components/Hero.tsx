import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface HeroProps {
  title: string
  subtitle?: string
  backgroundImage: string
  buttonText?: string
  buttonLink?: string
  overlay?: boolean
  height?: 'full' | 'large' | 'medium' | 'small'
  alignment?: 'center' | 'left'
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  buttonText,
  buttonLink = '/contact',
  overlay = true,
  height = 'large',
  alignment = 'center'
}) => {
  const heightClasses = {
    full: 'min-h-screen',
    large: 'min-h-[80vh]',
    medium: 'min-h-[60vh]',
    small: 'min-h-[40vh]'
  }

  const alignmentClasses = {
    center: 'text-center items-center justify-center',
    left: 'text-left items-start justify-center'
  }

  return (
    <div 
      className={`relative flex ${heightClasses[height]} bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      )}
      
      <div className={`container relative z-10 px-4 flex flex-col ${alignmentClasses[alignment]}`}>
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            className="text-xl md:text-2xl text-white mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
        
        {buttonText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              to={buttonLink} 
              className="btn btn-primary"
            >
              {buttonText}
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Hero
