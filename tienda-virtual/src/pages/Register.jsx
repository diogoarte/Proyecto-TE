import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/login.css'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.username || !form.email || !form.password) return setError('Completa todos los campos.')
    if (form.password !== form.confirm) return setError('Las contraseñas no coinciden.')
    if (form.password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.')
    const result = register(form.username, form.email, form.password)
    if (!result.ok) return setError(result.error)
    navigate('/')
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h1>🛍️ Mi Tienda Virtual</h1>
          <p>Crea tu cuenta gratis</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre de usuario</label>
            <input type="text" name="username" placeholder="tunombre" value={form.username} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Correo electrónico</label>
            <input type="email" name="email" placeholder="tu@correo.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" name="password" placeholder="Mínimo 6 caracteres" value={form.password} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Confirmar contraseña</label>
            <input type="password" name="confirm" placeholder="Repite tu contraseña" value={form.confirm} onChange={handleChange} />
          </div>
          {error && <p className="login-error">⚠️ {error}</p>}
          <button type="submit" className="btn-login">Crear cuenta</button>
        </form>
        <div className="login-footer">
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register