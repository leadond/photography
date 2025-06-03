import React, { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  opacity?: number
  border?: boolean
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  blur = 'md',
  opacity = 0.3,
  border = true
}) => {
  const getBlurClass = () => {
    switch (blur) {
      case 'sm': return 'backdrop-blur-sm'
      case 'md': return 'backdrop-blur-md'
      case 'lg': return 'backdrop-blur-lg'
      case 'xl': return 'backdrop-blur-xl'
      case '2xl': return 'backdrop-blur-2xl'
      default: return 'backdrop-blur-md'
    }
  }
  
  return (
    <div 
      className={`
        ${getBlurClass()} 
        bg-white/[${opacity}] 
        ${border ? 'border border-white/20' : ''} 
        rounded-xl 
        ${className}
      `}
      style={{ 
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}
    >
      {children}
    </div>
  )
}

export default GlassCard
