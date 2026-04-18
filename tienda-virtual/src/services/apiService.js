import { API_BASE_URL, API_ENDPOINTS } from '../config/api'

const defaultHeaders = { 'Content-Type': 'application/json' }

export const apiService = {
  async fetchProducts() {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`)
      if (!res.ok) throw new Error('Error fetching products')
      return await res.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async fetchProductById(id) {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCT_DETAIL(id)}`)
      if (!res.ok) throw new Error('Error fetching product')
      return await res.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async fetchCategories() {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CATEGORIES}`)
      if (!res.ok) throw new Error('Error fetching categories')
      return await res.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async fetchProductsByCategory(category) {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category)}`)
      if (!res.ok) throw new Error('Error fetching products by category')
      return await res.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async login(username, password) {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH_LOGIN}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) throw new Error('Login failed')
      return await res.json()
    } catch (error) {
      console.error('Login Error:', error)
      throw error
    }
  },

  async fetchUsers() {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USERS}`)
      if (!res.ok) throw new Error('Error fetching users')
      return await res.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async registerUser({ username, email, password }) {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTER}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({ username, email, password }),
      })
      if (!res.ok) throw new Error('Register failed')
      return await res.json()
    } catch (error) {
      console.error('Register Error:', error)
      throw error
    }
  },
}