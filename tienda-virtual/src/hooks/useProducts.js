import { useState, useEffect } from 'react'
import { apiService } from '../services/apiService'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await apiService.fetchProducts()
        setProducts(data)
      } catch (err) {
        setError(err.message || 'Error loading products')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return { products, loading, error }
}

export const useProductDetail = (id) => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const loadProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await apiService.fetchProductById(id)
        setProduct(data)
      } catch (err) {
        setError(err.message || 'Error loading product')
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  return { product, loading, error }
}

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await apiService.fetchCategories()
        setCategories(data)
      } catch (err) {
        setError(err.message || 'Error loading categories')
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  return { categories, loading, error }
}

export const useProductsByCategory = (category) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!category) {
      setProducts([])
      return
    }

    const loadProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await apiService.fetchProductsByCategory(category)
        setProducts(data)
      } catch (err) {
        setError(err.message || 'Error loading products')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [category])

  return { products, loading, error }
}
