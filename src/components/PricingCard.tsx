import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookingPackage } from '../context/BookingContext'

interface PricingCardProps {
  package: BookingPackage
  index: number
}

const PricingCard: React.FC<PricingCardProps> = ({ package: pkg, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-lg overflow-hidden ${
        pkg.popular 
          ? 'border-2 border-primary-500 shadow-xl' 
          : 'border border-gray-200 shadow-md'
      }`}
    >
      {pkg.popular && (
        <div className="bg-primary-500 text-white text-center py-2 font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6 bg-white">
        <h3 className="text-2xl font-bold text-gray-900">{pkg.name}</h3>
        <p className="mt-2 text-gray-600">{pkg.description}</p>
        
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-extrabold text-gray-900">${pkg.price}</span>
          <span className="ml-1 text-xl font-medium text-gray-500">/ session</span>
        </div>
        
        <p className="mt-2 text-sm text-gray-500">{pkg.duration} session</p>
        
        <ul className="mt-6 space-y-4">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-8">
          <Link
            to={`/booking?package=${pkg.id}`}
            className={`block w-full text-center py-3 px-4 rounded-md font-medium ${
              pkg.popular
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default PricingCard
