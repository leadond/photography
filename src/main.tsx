import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { GalleryProvider } from './context/GalleryContext'
import { BookingProvider } from './context/BookingContext'
import './index.css'

// Preload critical resources
const preloadResources = () => {
  // Preload important images
  const imagesToPreload = [
    '/images/hero-bg.jpg',
    '/images/logo.png'
  ]
  
  imagesToPreload.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
}

// Execute preloading
preloadResources()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GalleryProvider>
          <BookingProvider>
            <App />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                }
              }}
            />
          </BookingProvider>
        </GalleryProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
