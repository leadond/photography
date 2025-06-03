import { useState, useEffect, useRef } from 'react'

interface TextRevealProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  speed = 50,
  delay = 0
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isRevealing, setIsRevealing] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const elementRef = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    // Reset when text changes
    setDisplayedText('')
    setIsRevealing(false)
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Set up intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isRevealing) {
          timeoutRef.current = setTimeout(() => {
            setIsRevealing(true)
          }, delay)
        }
      },
      { threshold: 0.1 }
    )
    
    if (elementRef.current) {
      observerRef.current.observe(elementRef.current)
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      if (observerRef.current && elementRef.current) {
        observerRef.current.unobserve(elementRef.current)
      }
    }
  }, [text, delay])
  
  useEffect(() => {
    if (!isRevealing) return
    
    let currentIndex = 0
    
    const revealNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1))
        currentIndex++
        timeoutRef.current = setTimeout(revealNextChar, speed)
      }
    }
    
    revealNextChar()
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isRevealing, text, speed])
  
  return (
    <span ref={elementRef} className={className}>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="inline-block w-1 h-5 bg-current animate-pulse ml-1"></span>
      )}
    </span>
  )
}

export default TextReveal
