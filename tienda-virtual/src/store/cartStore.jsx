import { create } from 'zustand'
import { storageService } from '../services/storageService'

export const useCartStore = create((set, get) => ({
  cart: storageService.getCart(),

  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id)
      let newCart

      if (existingProduct) {
        newCart = state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        newCart = [...state.cart, { ...product, quantity: 1 }]
      }

      storageService.saveCart(newCart)
      return { cart: newCart }
    }),

  removeFromCart: (id) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== id)
      storageService.saveCart(newCart)
      return { cart: newCart }
    }),

  increaseQuantity: (id) =>
    set((state) => {
      const newCart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
      storageService.saveCart(newCart)
      return { cart: newCart }
    }),

  decreaseQuantity: (id) =>
    set((state) => {
      const newCart = state.cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
      storageService.saveCart(newCart)
      return { cart: newCart }
    }),

  clearCart: () =>
    set(() => {
      storageService.clearCart()
      return { cart: [] }
    }),

  getTotal: () => {
    const state = get()
    return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  getCartCount: () => {
    const state = get()
    return state.cart.reduce((count, item) => count + item.quantity, 0)
  },
}))
