import React, { createContext, useState, useEffect } from 'react'
import { storageService } from '../services/storageService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = storageService.getUser()
    if (savedUser) {
      setUser(savedUser)
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    storageService.saveUser(userData)
    setUser(userData)
  }

  const logout = () => {
    storageService.clearUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
