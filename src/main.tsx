import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { GalleryProvider } from './context/GalleryContext'
import { BookingProvider } from './context/BookingContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GalleryProvider>
          <BookingProvider>
            <App />
            <Toaster position="top-right" />
          </BookingProvider>
        </GalleryProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
