import { createContext, useState } from 'react'
import { apiService } from '../services/apiService'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const login = async (username, password) => {
    // 1. Primero busca en usuarios registrados localmente
    const localUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const localFound = localUsers.find(u => u.username === username && u.password === password)

    if (localFound) {
      const { password: _, ...safeUser } = localFound
      setUser(safeUser)
      localStorage.setItem('user', JSON.stringify(safeUser))
      return { ok: true }
    }

    // 2. Si no está local, intenta con fakestoreapi
    try {
      const data = await apiService.login(username, password)
      if (!data.token) return { ok: false, error: 'Usuario o contraseña incorrectos' }

      const users = await apiService.fetchUsers()
      const found = users.find(u => u.username === username)

      const safeUser = found
        ? { id: found.id, username: found.username, email: found.email, token: data.token, name: found.name }
        : { username, token: data.token }

      setUser(safeUser)
      localStorage.setItem('user', JSON.stringify(safeUser))
      return { ok: true }
    } catch {
      return { ok: false, error: 'Usuario o contraseña incorrectos' }
    }
  }

  const register = (username, email, password) => {
    const localUsers = JSON.parse(localStorage.getItem('users') || '[]')

    if (localUsers.find(u => u.username === username)) {
      return { ok: false, error: 'Ese nombre de usuario ya existe' }
    }
    if (localUsers.find(u => u.email === email)) {
      return { ok: false, error: 'Ese correo ya está registrado' }
    }

    const newUser = { id: Date.now(), username, email, password }
    localUsers.push(newUser)
    localStorage.setItem('users', JSON.stringify(localUsers))

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