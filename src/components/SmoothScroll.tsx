import { useEffect, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface SmoothScrollProps {
  children: ReactNode
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [location.pathname])

  return <>{children}</>
}

export default SmoothScroll
