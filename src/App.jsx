import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import DashboardPage from './pages/DashboardPage'
import MyBookingsPage from './pages/MyBookingsPage'
import MyAlbumsPage from './pages/MyAlbumsPage'
import AlbumDetailPage from './pages/AlbumDetailPage'
import BookingPage from './pages/BookingPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminAlbumsPage from './pages/AdminAlbumsPage'
import AdminAlbumDetailPage from './pages/AdminAlbumDetailPage'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import AdminLayout from './layouts/AdminLayout'
import MainLayout from './layouts/MainLayout'
import './App.css'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* Protected User Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-bookings" 
            element={
              <ProtectedRoute>
                <MyBookingsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-albums" 
            element={
              <ProtectedRoute>
                <MyAlbumsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-albums/:albumId" 
            element={
              <ProtectedRoute>
                <AlbumDetailPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/booking" 
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            } 
          />
        </Route>
        
        {/* Admin Routes */}
        <Route 
          path="/admin/*" 
          element={
            <AdminRoute>
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<AdminDashboardPage />} />
                  <Route path="/albums" element={<AdminAlbumsPage />} />
                  <Route path="/albums/:albumId" element={<AdminAlbumDetailPage />} />
                  {/* Add other admin routes here */}
                </Routes>
              </AdminLayout>
            </AdminRoute>
          } 
        />
      </Routes>
    </div>
  )
}

export default App
