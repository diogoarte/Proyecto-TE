import { useAuth } from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import { storageService } from '../services/storageService'
import { formatPrice } from '../utils/helpers'
import '../styles/profile.css'

function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
    return null
  }

  const allOrders = storageService.getOrders()
  const orders = allOrders.filter(o => o.customer?.email === user.email)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <section className="profile-page">
      <div className="profile-header">
        <div className="avatar">
          {(user.username || user.email)[0].toUpperCase()}
        </div>
        <div>
          <h1>{user.username || 'Usuario'}</h1>
          <p>{user.email}</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">Cerrar sesión</button>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <span className="stat-number">{orders.length}</span>
          <span className="stat-label">Pedidos</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {formatPrice(orders.reduce((s, o) => s + o.total, 0))}
          </span>
          <span className="stat-label">Total gastado</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {orders.reduce((s, o) => s + o.items.length, 0)}
          </span>
          <span className="stat-label">Productos comprados</span>
        </div>
      </div>

      <div className="orders-section">
        <h2>📦 Historial de Compras</h2>

        {orders.length === 0 ? (
          <div className="no-orders">
            <p>🛒 Aún no tienes pedidos</p>
            <Link to="/products" className="btn-primary">Ver productos</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.slice().reverse().map(order => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <span className="order-id">#{order.id}</span>
                    <span className="order-date">
                      {new Date(order.date).toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="order-total">{formatPrice(order.total)}</div>
                </div>
                <div className="order-items-preview">
                  {order.items.map(item => (
                    <div key={item.id} className="order-item-mini">
                      <img src={item.image} alt={item.title} />
                      <span>{item.title.substring(0, 30)}...</span>
                      <span className="qty">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="order-card-footer">
                  <span className="order-status">✅ {order.status}</span>
                  <Link to={`/confirmation/${order.id}`} className="btn-ver">Ver detalle →</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Profile