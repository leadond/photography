import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LoginModal from '../components/modals/LoginModal'
import BookingModal from '../components/modals/BookingModal'
import SuccessModal from '../components/modals/SuccessModal'
import { useState } from 'react'

function MainLayout() {
  const [modals, setModals] = useState({
    loginModal: false,
    bookingModal: false,
    successModal: false,
    successMessage: ''
  })

  const toggleModal = (modalName, value = null, message = '') => {
    if (modalName === 'successModal' && message) {
      setModals(prev => ({
        ...prev,
        [modalName]: value !== null ? value : !prev[modalName],
        successMessage: message
      }))
    } else {
      setModals(prev => ({
        ...prev,
        [modalName]: value !== null ? value : !prev[modalName]
      }))
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar toggleModal={toggleModal} />
      <main className="flex-grow">
        <Outlet context={{ toggleModal }} />
      </main>
      <Footer />

      {/* Modals */}
      <LoginModal 
        isOpen={modals.loginModal} 
        onClose={() => toggleModal('loginModal', false)} 
      />
      <BookingModal 
        isOpen={modals.bookingModal} 
        onClose={() => toggleModal('bookingModal', false)}
        onSuccess={(message) => {
          toggleModal('bookingModal', false)
          toggleModal('successModal', true, message)
        }}
      />
      <SuccessModal 
        isOpen={modals.successModal} 
        onClose={() => toggleModal('successModal', false)}
        message={modals.successMessage}
      />
    </div>
  )
}

export default MainLayout
