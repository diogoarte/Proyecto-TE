import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { ok: false, error: 'Correo o contraseña incorrectos' }
    const { password: _, ...safeUser } = found
    setUser(safeUser)
    localStorage.setItem('user', JSON.stringify(safeUser))
    return { ok: true }
  }

  const register = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(u => u.email === email)) return { ok: false, error: 'El correo ya está registrado' }
    const newUser = { id: Date.now(), username, email, password }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    const { password: _, ...safeUser } = newUser
    setUser(safeUser)
    localStorage.setItem('user', JSON.stringify(safeUser))
    return { ok: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}