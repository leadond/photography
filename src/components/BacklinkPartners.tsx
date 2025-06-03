import { Link } from 'react-router-dom'

const BacklinkPartners = () => {
  const partners = [
    {
      id: 1,
      name: 'Wedding Wire',
      logo: 'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      url: 'https://www.weddingwire.com',
      description: 'Find top-rated wedding photographers in your area'
    },
    {
      id: 2,
      name: 'The Knot',
      logo: 'https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      url: 'https://www.theknot.com',
      description: 'Discover wedding photographers for your special day'
    },
    {
      id: 3,
      name: 'Thumbtack',
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      url: 'https://www.thumbtack.com',
      description: 'Find local photographers for any occasion'
    },
    {
      id: 4,
      name: 'Yelp',
      logo: 'https://images.pexels.com/photos/7709020/pexels-photo-7709020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      url: 'https://www.yelp.com',
      description: 'Read reviews of top photographers in your area'
    }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4">Our Partners</h2>
          <p className="text-gray-600">
            DXM Productions is proud to be featured on these trusted platforms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map(partner => (
            <a 
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{partner.name}</h3>
                <p className="text-gray-600 text-sm">{partner.description}</p>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">
            Looking to partner with us? We're always open to new collaborations.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BacklinkPartners
