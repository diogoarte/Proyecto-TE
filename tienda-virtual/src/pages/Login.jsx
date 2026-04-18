import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/login.css'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username || !form.password) return setError('Completa todos los campos.')
    setLoading(true)
    const result = await login(form.username, form.password)
    setLoading(false)
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
            <label>Usuario</label>
            <input type="text" name="username" placeholder="johnd" value={form.username} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} />
          </div>
          {error && <p className="login-error">⚠️ {error}</p>}
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? '⏳ Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>
        <div className="login-footer">
          <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
          <p className="login-hint">💡 Usuario de prueba: <strong>johnd</strong> / <strong>m38rmF$</strong></p>
        </div>
      </div>
    </div>
  )
}

export default Login