import { useState, useEffect, useRef } from 'react'

interface TypewriterEffectProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenTexts?: number
  className?: string
  cursorClassName?: string
  loop?: boolean
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1500,
  className = '',
  cursorClassName = '',
  loop = true
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTypingPaused, setIsTypingPaused] = useState(false)
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    if (texts.length === 0) return
    
    const currentFullText = texts[currentTextIndex]
    
    const handleTyping = () => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      // If paused, wait before continuing
      if (isTypingPaused) {
        timeoutRef.current = setTimeout(() => {
          setIsTypingPaused(false)
          setIsDeleting(true)
        }, delayBetweenTexts)
        return
      }
      
      // Determine the next text based on whether we're typing or deleting
      const nextText = isDeleting
        ? displayedText.substring(0, displayedText.length - 1)
        : currentFullText.substring(0, displayedText.length + 1)
      
      setDisplayedText(nextText)
      
      // Determine the speed based on whether we're typing or deleting
      const speed = isDeleting ? deletingSpeed : typingSpeed
      
      // Check if we've completed typing or deleting
      if (!isDeleting && nextText === currentFullText) {
        // Finished typing, pause before deleting
        setIsTypingPaused(true)
      } else if (isDeleting && nextText === '') {
        // Finished deleting, move to next text
        setIsDeleting(false)
        
        if (loop || currentTextIndex < texts.length - 1) {
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
        }
      } else {
        // Continue typing or deleting
        timeoutRef.current = setTimeout(handleTyping, speed)
      }
    }
    
    // Start the typing effect
    timeoutRef.current = setTimeout(handleTyping, typingSpeed)
    
    // Cleanup on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [
    texts, 
    currentTextIndex, 
    displayedText, 
    isDeleting, 
    isTypingPaused, 
    typingSpeed, 
    deletingSpeed, 
    delayBetweenTexts,
    loop
  ])
  
  return (
    <span className={className}>
      {displayedText}
      <span className={`inline-block w-1 h-5 bg-current animate-pulse ml-1 ${cursorClassName}`}></span>
    </span>
  )
}

export default TypewriterEffect
