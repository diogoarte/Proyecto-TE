import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/login.css'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) return setError('Completa todos los campos.')
    const result = login(form.email, form.password)
    if (!result.ok) return setError(result.error)
    navigate('/')
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h1>🛍️ Mi Tienda Virtual</h1>
          <p>Inicia sesión para continuar</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Correo electrónico</label>
            <input type="email" name="email" placeholder="tu@correo.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} />
          </div>
          {error && <p className="login-error">⚠️ {error}</p>}
          <button type="submit" className="btn-login">Iniciar sesión</button>
        </form>
        <div className="login-footer">
          <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login