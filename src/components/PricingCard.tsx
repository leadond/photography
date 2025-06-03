import { Link } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/24/outline'

interface PricingCardProps {
  title: string
  price: number
  description: string
  features: string[]
  popular?: boolean
  id: string
}

const PricingCard = ({ title, price, description, features, popular = false, id }: PricingCardProps) => {
  return (
    <div className={`card ${popular ? 'ring-2 ring-primary-500' : ''} relative`}>
      {popular && (
        <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-primary-500 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase">
          Popular
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 font-serif">{title}</h3>
        <p className="mt-4 text-gray-600">{description}</p>
        <p className="mt-8">
          <span className="text-4xl font-extrabold text-gray-900">${price}</span>
        </p>
        <ul className="mt-6 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex">
              <CheckIcon className="flex-shrink-0 h-6 w-6 text-green-500" />
              <span className="ml-3 text-gray-500">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link
            to={`/dashboard/checkout/${id}`}
            className={`w-full btn ${popular ? 'btn-primary' : 'btn-secondary'}`}
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PricingCard
