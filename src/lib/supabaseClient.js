import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tnomchrujzfhpxtycdzs.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRub21jaHJ1anpmaHB4dHljZHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MzI1NTAsImV4cCI6MjA2NDEwODU1MH0.PFS_kEn6jjX5gwQoDN1YxR9fqfl_3e4aeLiOCYYESLk'

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false
  },
  // Enable cache for better performance
  global: {
    headers: { 'Cache-Control': 'max-age=300' }
  }
})
