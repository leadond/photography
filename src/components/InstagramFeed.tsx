const InstagramFeed = () => {
  // Mock Instagram posts
  const mockPosts = [
    {
      id: '1',
      imageUrl: 'https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Beautiful graduation photoshoot today! #dxmproductions #graduation',
      likes: 124,
      link: 'https://www.instagram.com/dxmproductions/tagged/'
    },
    {
      id: '2',
      imageUrl: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Family portraits in the park #dxmproductions #familyphotos',
      likes: 98,
      link: 'https://www.instagram.com/dxmproductions/tagged/'
    },
    {
      id: '3',
      imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Corporate event photography #dxmproductions #corporateevents',
      likes: 156,
      link: 'https://www.instagram.com/dxmproductions/tagged/'
    },
    {
      id: '4',
      imageUrl: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Professional headshots for LinkedIn #dxmproductions #headshots',
      likes: 201,
      link: 'https://www.instagram.com/dxmproductions/tagged/'
    },
    {
      id: '5',
      imageUrl: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Wedding photography session #dxmproductions #weddingphotos',
      likes: 312,
      link: 'https://www.instagram.com/dxmproductions/tagged/'
    },
    {
      id: '6',
      imageUrl: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: "Behind the scenes at today's shoot #dxmproductions #bts",
      likes: 87,
      link: 'https://www.instagram.com/dxmproductions/tagged/'
    },
    // New diverse Instagram posts
    {
      id: '7',
      imageUrl: 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Capturing beautiful moments at today's family session #dxmproductions #familyphotography',
      likes: 143,
      link: 'https://www.instagram.com/dxmproductions/tagged/'
    },
    {
      id: '8',
      imageUrl: 'https://images.pexels.com/photos/3812944/pexels-photo-3812944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Professional portraits that tell your story #dxmproductions #portraitphotography',
      likes: 178,
      link: 'https://www.instagram.com/dxmproductions/tagged/'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mockPosts.map(post => (
        <a 
          key={post.id}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group overflow-hidden rounded-lg aspect-square"
        >
          <img 
            src={post.imageUrl} 
            alt={post.caption} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
              <div className="flex items-center justify-center mb-2">
                <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>{post.likes}</span>
              </div>
              <p className="text-xs line-clamp-2">{post.caption}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

export default InstagramFeed
