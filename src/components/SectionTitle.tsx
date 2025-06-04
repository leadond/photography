import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SectionTitleProps {
  title: string
  subtitle?: string
  center?: boolean
  light?: boolean
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  center = true,
  light = false
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <div 
      ref={ref} 
      className={`mb-12 ${center ? 'text-center' : 'text-left'}`}
    >
      <motion.h2 
        className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-gray-900'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className={`text-lg ${light ? 'text-gray-300' : 'text-gray-600'} max-w-3xl ${center ? 'mx-auto' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default SectionTitle
