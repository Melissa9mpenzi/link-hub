// User types
export interface User {
  id: string
  email: string
  full_name: string
  phone: string
  role: 'customer' | 'provider' | 'admin'
  is_active: boolean
  is_verified: boolean
  created_at: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

// Provider types
export interface Provider {
  id: string
  business_name: string
  bio: string
  district: string
  service_areas: string[]
  verification_status: 'pending' | 'verified' | 'rejected'
  profile_image?: string
  phone: string
  rating_average: number
  total_reviews: number
  joined_date: string
  services?: Service[]
  portfolio?: PortfolioItem[]
  recent_reviews?: Review[]
}

// Service types
export interface Service {
  id: string
  provider_id: string
  category: string
  title: string
  description: string
  starting_price: string
  currency: string
  is_available: boolean
}

// Portfolio types
export interface PortfolioItem {
  id: string
  provider_id: string
  image_url: string
  caption: string
}

// Quote Request types
export interface QuoteRequest {
  id: string
  customer_id: string
  description: string
  district: string
  specific_location?: string
  budget: string
  deadline: string
  status: 'open' | 'quoted' | 'closed'
  created_at: string
  quotes_count: number
}

// Quote types
export interface Quote {
  id: string
  request_id: string
  provider_id: string
  amount: string
  message: string
  estimated_duration: string
  expires_at: string
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  created_at: string
}

// Booking types
export interface Booking {
  id: string
  customer_id: string
  provider_id: string
  quote_id: string
  scheduled_at: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  created_at: string
  can_review: boolean
}

// Review types
export interface Review {
  id: string
  booking_id: string
  reviewer_id: string
  rating: number
  comment: string
  would_recommend: boolean
  created_at: string
}

// Notification types
export interface Notification {
  id: string
  type: string
  message: string
  read_at: string | null
  created_at: string
  action_url?: string
}

// Category types
export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  services_count: number
}
