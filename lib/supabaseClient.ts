import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables are not configured.')
  console.warn('Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.')
  console.warn('Follow the setup guide in SUPABASE_SETUP.md for instructions.')
  
  // Throw error only if not using placeholder values
  if (!supabaseUrl?.includes('your_supabase') && !supabaseAnonKey?.includes('your_supabase')) {
    throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
  }
}

// Create client with fallback values for development
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-anon-key'
)

// Define the type for our quotes table
export interface QuoteRequest {
  id?: number
  name: string
  email?: string
  phone: string
  project_type?: string
  project_location?: string
  budget?: string
  timeline?: string
  property_size?: string
  description: string
  services_needed?: string[]
  additional_info?: string
  created_at?: string
}