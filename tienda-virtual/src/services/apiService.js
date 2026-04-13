import { API_BASE_URL, API_ENDPOINTS } from '../config/api'

const defaultHeaders = {
  'Content-Type': 'application/json',
}

export const apiService = {
  async fetchProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`)
      if (!response.ok) throw new Error('Error fetching products')
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async fetchProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCT_DETAIL(id)}`)
      if (!response.ok) throw new Error('Error fetching product')
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async fetchCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CATEGORIES}`)
      if (!response.ok) throw new Error('Error fetching categories')
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async fetchProductsByCategory(category) {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category)}`)
      if (!response.ok) throw new Error('Error fetching products by category')
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH_LOGIN}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({ username, password }),
      })
      if (!response.ok) throw new Error('Login failed')
      return await response.json()
    } catch (error) {
      console.error('Login Error:', error)
      throw error
    }
  },
}
