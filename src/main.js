// Mobile Menu Toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('hidden');
}

// Modal Toggle
function toggleModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal.classList.contains('hidden')) {
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Add animation
    setTimeout(() => {
      const modalContent = modal.querySelector('div');
      modalContent.classList.add('slide-enter-active');
      modalContent.classList.remove('slide-enter');
    }, 10);
    
    // Add modal content animation
    const modalContent = modal.querySelector('div');
    modalContent.classList.add('slide-enter');
    modalContent.classList.remove('slide-enter-active');
  } else {
    // Hide modal
    const modalContent = modal.querySelector('div');
    modalContent.classList.add('slide-enter');
    modalContent.classList.remove('slide-enter-active');
    
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = ''; // Restore scrolling
    }, 300);
  }
}

// Portfolio Gallery Filter
function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-item');
  const buttons = document.querySelectorAll('.category-btn');
  
  // Update active button
  buttons.forEach(button => {
    if (button.textContent.toLowerCase().includes(category)) {
      button.classList.add('bg-accent', 'text-white');
      button.classList.remove('bg-gray-200', 'hover:bg-gray-300');
    } else {
      button.classList.remove('bg-accent', 'text-white');
      button.classList.add('bg-gray-200', 'hover:bg-gray-300');
    }
  });
  
  // Filter items
  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Carousel Functionality
let currentSlide = 0;
const totalSlides = 3;

function showSlide(index) {
  const carousel = document.getElementById('carouselInner');
  const indicators = document.querySelectorAll('.carousel-indicator');
  
  // Update current slide index
  currentSlide = index;
  
  // Update carousel position
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Update indicators
  indicators.forEach((indicator, i) => {
    if (i === currentSlide) {
      indicator.classList.add('bg-accent');
      indicator.classList.remove('bg-gray-300');
    } else {
      indicator.classList.remove('bg-accent');
      indicator.classList.add('bg-gray-300');
    }
  });
}

function nextSlide() {
  showSlide((currentSlide + 1) % totalSlides);
}

function prevSlide() {
  showSlide((currentSlide - 1 + totalSlides) % totalSlides);
}

// Form Submissions
document.addEventListener('DOMContentLoaded', function() {
  // Carousel Controls
  document.getElementById('nextBtn').addEventListener('click', nextSlide);
  document.getElementById('prevBtn').addEventListener('click', prevSlide);
  
  // Carousel Indicators
  document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
    indicator.addEventListener('click', () => showSlide(index));
  });
  
  // Auto-advance carousel
  setInterval(nextSlide, 5000);
  
  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate form submission
      setTimeout(() => {
        document.getElementById('successMessage').textContent = 'Your message has been sent successfully. We\'ll get back to you soon.';
        toggleModal('successModal');
        contactForm.reset();
      }, 1000);
    });
  }
  
  // Booking Form Submission
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate form submission
      setTimeout(() => {
        document.getElementById('successMessage').textContent = 'Your booking request has been submitted successfully. We\'ll contact you shortly to confirm your appointment.';
        toggleModal('successModal');
        toggleModal('bookingModal');
        bookingForm.reset();
      }, 1000);
    });
  }
  
  // Login Form Submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate login
      setTimeout(() => {
        toggleModal('loginModal');
        loginForm.reset();
        // You would typically redirect to a dashboard or show a welcome message
      }, 1000);
    });
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobileMenu');
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
      
      // Scroll to target
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
    }
  });
});

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight - 100) {
      element.classList.add('animate-active');
    }
  });
}

// Add animation classes to elements
function setupAnimations() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const headings = section.querySelectorAll('h2, h3');
    const paragraphs = section.querySelectorAll('p');
    const images = section.querySelectorAll('img, .gallery-img');
    const buttons = section.querySelectorAll('button, .btn');
    
    [...headings, ...paragraphs, ...images, ...buttons].forEach(element => {
      element.classList.add('animate-on-scroll');
    });
  });
  
  // Initial check
  animateOnScroll();
  
  // Listen for scroll
  window.addEventListener('scroll', animateOnScroll);
}

// Initialize animations
window.addEventListener('load', setupAnimations);
