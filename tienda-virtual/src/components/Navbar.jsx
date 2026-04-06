import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

function Navbar() {
  const cart = useCartStore((state) => state.cart)

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <nav className="navbar">
      <h2 className="logo">Mi Tienda</h2>

      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/products">Productos</Link>
        <Link to="/cart">Carrito ({totalItems})</Link>
      </div>
    </nav>
  )
}

export default Navbar
