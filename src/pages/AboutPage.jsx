import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Studio</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Learn more about our photography journey, our team, and our passion for capturing life's precious moments.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <StoryImage />
            <StoryContent />
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our talented photographers bring years of experience and a passion for visual storytelling.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide our work and ensure we deliver exceptional photography services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard key={index} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's create beautiful photographs together. Contact us today to discuss your photography needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/booking" 
              className="px-8 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Book a Session
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 border-2 border-white text-white rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Story Image Component
const StoryImage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="rounded-lg overflow-hidden shadow-xl">
        <img 
          src="https://images.pexels.com/photos/3379943/pexels-photo-3379943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Photography studio" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-lg z-0"></div>
    </motion.div>
  );
};

// Story Content Component
const StoryContent = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
      <p className="text-gray-600 mb-6">
        Founded in 2010, LensCraft Photography began as a small studio with a big vision: to capture life's most precious moments with artistry and authenticity. What started as a passion project by our founder, Michael Reynolds, has grown into a team of dedicated photographers who share the same commitment to visual storytelling.
      </p>
      <p className="text-gray-600 mb-6">
        Over the years, we've had the privilege of documenting thousands of special moments—from intimate weddings and family milestones to corporate events and commercial projects. Each photograph we take is guided by our belief that great photography goes beyond technical skill; it's about connecting with people and understanding their unique stories.
      </p>
      <p className="text-gray-600 mb-6">
        Today, LensCraft Photography is recognized for our distinctive style that blends timeless elegance with contemporary creativity. We continue to evolve and innovate, but our core mission remains the same: to create beautiful, meaningful images that our clients will treasure for generations.
      </p>
      <div className="flex items-center">
        <img 
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Michael Reynolds" 
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900">Michael Reynolds</h4>
          <p className="text-gray-500">Founder & Lead Photographer</p>
        </div>
      </div>
    </motion.div>
  );
};

// Team Member Component
const TeamMember = ({ member, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-lg overflow-hidden shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1 text-gray-900">{member.name}</h3>
        <p className="text-blue-500 font-medium mb-3">{member.role}</p>
        <p className="text-gray-600 mb-4">{member.bio}</p>
        <div className="flex space-x-3">
          {member.social.map((platform, i) => (
            <a 
              key={i}
              href={platform.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-colors"
            >
              {platform.icon}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Value Card Component
const ValueCard = ({ value, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-lg p-6 shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="text-blue-500 text-4xl mb-4">{value.icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
      <p className="text-gray-600">{value.description}</p>
    </motion.div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-lg p-6 shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.type}</p>
        </div>
      </div>
      <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </motion.div>
  );
};

// Sample data
const teamMembers = [
  {
    name: "Michael Reynolds",
    role: "Founder & Lead Photographer",
    bio: "With over 15 years of experience, Michael specializes in portrait and wedding photography. His work has been featured in numerous publications.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    social: [
      { icon: "IG", url: "#" },
      { icon: "FB", url: "#" },
      { icon: "TW", url: "#" }
    ]
  },
  {
    name: "Sarah Chen",
    role: "Senior Photographer",
    bio: "Sarah brings a unique perspective to event and commercial photography. Her background in fine arts influences her creative approach.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    social: [
      { icon: "IG", url: "#" },
      { icon: "FB", url: "#" },
      { icon: "TW", url: "#" }
    ]
  },
  {
    name: "David Wilson",
    role: "Photographer & Retoucher",
    bio: "David excels in both photography and post-processing. His attention to detail ensures every image meets our high quality standards.",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    social: [
      { icon: "IG", url: "#" },
      { icon: "FB", url: "#" },
      { icon: "TW", url: "#" }
    ]
  }
];

const values = [
  {
    icon: "🎨",
    title: "Artistic Excellence",
    description: "We approach each project with creativity and technical precision, striving to create images that are both beautiful and meaningful."
  },
  {
    icon: "🤝",
    title: "Client Relationship",
    description: "We believe in building strong relationships with our clients, understanding their vision, and exceeding their expectations."
  },
  {
    icon: "⏱️",
    title: "Timeliness",
    description: "We respect our clients' time by being punctual for sessions and delivering finished products within the promised timeframe."
  },
  {
    icon: "💯",
    title: "Quality Assurance",
    description: "Every image we deliver undergoes a rigorous quality control process to ensure it meets our high standards."
  },
  {
    icon: "🔄",
    title: "Continuous Improvement",
    description: "We constantly refine our skills, update our equipment, and stay current with industry trends to provide the best service possible."
  },
  {
    icon: "🌱",
    title: "Sustainability",
    description: "We're committed to environmentally responsible practices in our studio operations and product offerings."
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    type: "Wedding Client",
    quote: "The photos from our wedding day are absolutely stunning. They captured every special moment perfectly, and working with the team was a joy from start to finish.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Michael Rodriguez",
    type: "Corporate Event",
    quote: "Professional, punctual, and produced amazing photos for our company event. The team was unobtrusive yet managed to capture all the key moments.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Emily Chen",
    type: "Family Portrait",
    quote: "Our family portraits turned out better than we could have imagined. They were patient with our children and captured genuine smiles and personalities.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "James Wilson",
    type: "Commercial Client",
    quote: "The product photography exceeded our expectations. The images have significantly improved our website conversion rate and online presence.",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

export default AboutPage;
