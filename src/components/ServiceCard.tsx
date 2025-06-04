import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  link: string
  index: number
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, link, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link 
          to={link} 
          className="text-primary-600 font-medium inline-flex items-center group-hover:text-primary-700"
        >
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </motion.div>
  )
}

export default ServiceCard
