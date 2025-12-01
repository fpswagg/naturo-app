export interface Author {
  name: string
  bio: string
  picture: string
  links: {
    facebook: string
    whatsapp: string
  }
  password: string
}

export interface CategoryWithProducts {
  id: string
  name: string
  createdAt: Date
  products: ProductWithCategory[]
}

export interface ProductWithCategory {
  id: string
  title: string
  description: string | null
  images: string[]
  price: number
  inStock: boolean
  categoryId: string
  category: {
    id: string
    name: string
  }
  averageRating: number
  createdAt: Date
  updatedAt: Date
}

export interface ProductWithReviews extends ProductWithCategory {
  reviews: Review[]
}

export interface Review {
  id: string
  productId: string
  client_name: string
  rating: number
  comment: string | null
  createdAt: Date
}

export interface Testimony {
  id: string
  client_name: string
  message: string
  createdAt: Date
}

export interface Message {
  id: string
  name: string
  message: string
  contact: string
  isRead: boolean
  createdAt: Date
}

export type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'rating'
