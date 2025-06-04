import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ScrollToTop from './components/ScrollToTop'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import AlbumPage from './pages/AlbumPage'
import ServicesPage from './pages/ServicesPage'
import PricingPage from './pages/PricingPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import MyAlbumsPage from './pages/MyAlbumsPage'
import MyBookingsPage from './pages/MyBookingsPage'
import BookingPage from './pages/BookingPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="gallery/:albumId" element={<AlbumPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="my-albums" element={<ProtectedRoute><MyAlbumsPage /></ProtectedRoute>} />
            <Route path="my-bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
