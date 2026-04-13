import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useAuth } from '../hooks/useAuth'
import '../styles/navbar.css'

function Navbar() {
  const cart = useCartStore((state) => state.cart)
  const { user, logout } = useAuth()

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🛍️ Mi Tienda Virtual
      </Link>

      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/products">Productos</Link>
        <Link to="/cart" className="cart-link">
          🛒 Carrito ({totalItems})
        </Link>

        {user ? (
          <div className="user-menu">
            <span className="username">👤 {user.username || user.email}</span>
            <button onClick={logout} className="logout-btn">
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-link">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
