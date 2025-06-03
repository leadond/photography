import React from 'react'

interface LogoWatermarkProps {
  variant?: 'd-gold' | 'd-white' | 'full-gold' | 'full-white'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
}

const LogoWatermark: React.FC<LogoWatermarkProps> = ({
  variant = 'd-gold',
  size = 'lg',
  className = ''
}) => {
  const getLogoPath = () => {
    switch (variant) {
      case 'd-gold': return '/logos/logo-d-gold.svg'
      case 'd-white': return '/logos/logo-d-white.svg'
      case 'full-gold': return '/logos/logo-full-gold.svg'
      case 'full-white': return '/logos/logo-full-white.svg'
      default: return '/logos/logo-d-gold.svg'
    }
  }
  
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'h-16 w-16'
      case 'md': return 'h-24 w-24'
      case 'lg': return 'h-32 w-32'
      case 'xl': return 'h-48 w-48'
      case '2xl': return 'h-64 w-64'
      default: return 'h-32 w-32'
    }
  }
  
  return (
    <div className={`pointer-events-none ${className}`}>
      <img 
        src={getLogoPath()} 
        alt="DXM Productions Logo" 
        className={`${getSizeClass()} object-contain`}
      />
    </div>
  )
}

export default LogoWatermark
