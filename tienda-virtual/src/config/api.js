export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://fakestoreapi.com'

export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id) => `/products/${id}`,
  CATEGORIES: '/products/categories',
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
  AUTH_LOGIN: '/auth/login',
  USERS: '/users',
  REGISTER: '/users',
}