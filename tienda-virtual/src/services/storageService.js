const CART_STORAGE_KEY = 'tienda_virtual_cart'
const USER_STORAGE_KEY = 'tienda_virtual_user'
const ORDERS_STORAGE_KEY = 'tienda_virtual_orders'

export const storageService = {
  // Cart operations
  saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (error) {
      console.error('Error saving cart:', error)
    }
  },

  getCart() {
    try {
      const cart = localStorage.getItem(CART_STORAGE_KEY)
      return cart ? JSON.parse(cart) : []
    } catch (error) {
      console.error('Error retrieving cart:', error)
      return []
    }
  },

  clearCart() {
    try {
      localStorage.removeItem(CART_STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  },

  // User operations
  saveUser(user) {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    } catch (error) {
      console.error('Error saving user:', error)
    }
  },

  getUser() {
    try {
      const user = localStorage.getItem(USER_STORAGE_KEY)
      return user ? JSON.parse(user) : null
    } catch (error) {
      console.error('Error retrieving user:', error)
      return null
    }
  },

  clearUser() {
    try {
      localStorage.removeItem(USER_STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing user:', error)
    }
  },

  // Orders operations
  saveOrder(order) {
    try {
      const orders = this.getOrders()
      orders.push(order)
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
    } catch (error) {
      console.error('Error saving order:', error)
    }
  },

  getOrders() {
    try {
      const orders = localStorage.getItem(ORDERS_STORAGE_KEY)
      return orders ? JSON.parse(orders) : []
    } catch (error) {
      console.error('Error retrieving orders:', error)
      return []
    }
  },
}
