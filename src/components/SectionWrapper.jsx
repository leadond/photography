import { memo } from 'react'
import AnimatedSection from './AnimatedSection'

/**
 * A wrapper component for page sections with consistent styling and animations
 * Memoized to prevent unnecessary re-renders
 */
const SectionWrapper = memo(({
  children,
  className = '',
  id,
  title,
  subtitle,
  fullWidth = false,
  animation = 'fadeIn',
  dark = false,
  ...props
}) => {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} ${className}`}
      {...props}
    >
      <div className={`${fullWidth ? 'w-full' : 'container mx-auto px-4'}`}>
        {(title || subtitle) && (
          <AnimatedSection 
            className="text-center mb-12"
            animation="slideUp"
          >
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-80">
                {subtitle}
              </p>
            )}
          </AnimatedSection>
        )}
        
        <AnimatedSection animation={animation}>
          {children}
        </AnimatedSection>
      </div>
    </section>
  )
})

SectionWrapper.displayName = 'SectionWrapper'

export default SectionWrapper
