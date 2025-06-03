export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string
          created_at: string
          user_id: string
          package_id: string
          date: string
          time: string
          location: string
          status: string
          notes: string | null
          payment_status: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          package_id: string
          date: string
          time: string
          location: string
          status?: string
          notes?: string | null
          payment_status?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          package_id?: string
          date?: string
          time?: string
          location?: string
          status?: string
          notes?: string | null
          payment_status?: string
        }
      }
      packages: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          duration: number
          image_url: string
          category: string
          features: string[]
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          duration: number
          image_url: string
          category: string
          features: string[]
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          duration?: number
          image_url?: string
          category?: string
          features?: string[]
        }
      }
      photo_sessions: {
        Row: {
          id: string
          appointment_id: string
          created_at: string
          photos: string[]
          status: string
        }
        Insert: {
          id?: string
          appointment_id: string
          created_at?: string
          photos: string[]
          status?: string
        }
        Update: {
          id?: string
          appointment_id?: string
          created_at?: string
          photos?: string[]
          status?: string
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          full_name: string | null
          phone: string | null
          address: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          full_name?: string | null
          phone?: string | null
          address?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          full_name?: string | null
          phone?: string | null
          address?: string | null
          avatar_url?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
