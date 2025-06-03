import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { Session, User } from '@supabase/supabase-js'
import toast from 'react-hot-toast'

interface AuthContextType {
  session: Session | null
  user: User | null
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  loading: false,
  error: null
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
  session: Session | null
}

export const AuthProvider = ({ children, session: initialSession }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(initialSession)
  const [user, setUser] = useState<User | null>(initialSession?.user || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setUser(session?.user || null)
  }, [session])

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })
      
      if (error) {
        setError(error.message)
        toast.error(error.message)
        return
      }
      
      if (data.user) {
        // Create a profile record
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: fullName,
              email: email
            }
          ])
        
        if (profileError) {
          console.error('Error creating profile:', profileError)
        }
        
        toast.success('Account created successfully! You are now logged in.')
      }
    } catch (error) {
      console.error('Error signing up:', error)
      setError('An unexpected error occurred. Please try again.')
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        setError(error.message)
        toast.error(error.message)
        return
      }
      
      setSession(data.session)
      toast.success('Signed in successfully!')
    } catch (error) {
      console.error('Error signing in:', error)
      setError('An unexpected error occurred. Please try again.')
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Error signing out:', error)
        toast.error('Error signing out. Please try again.')
        return
      }
      
      setSession(null)
      toast.success('Signed out successfully!')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const value = {
    session,
    user,
    signUp,
    signIn,
    signOut,
    loading,
    error
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
