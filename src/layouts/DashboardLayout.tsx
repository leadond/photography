import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      
      <Footer />
    </div>
  )
}

export default DashboardLayout
