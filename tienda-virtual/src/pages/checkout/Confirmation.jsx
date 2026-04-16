//tienda-virtual/src/pages/checkout/Confirmacion.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { storageService } from '../../services/storageService'
import { formatPrice } from '../../utils/helpers'
import '../../styles/confirmation.css'

function Confirmation() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const orders = storageService.getOrders()
    const foundOrder = orders.find((o) => o.id === orderId)
    setOrder(foundOrder)
    setLoading(false)
  }, [orderId])

  if (loading) {
    return <section className="loading">⏳ Cargando información...</section>
  }

  if (!order) {
    return (
      <section className="confirmation-error">
        <h1>❌ Orden no encontrada</h1>
        <p>No pudimos encontrar tu orden</p>
        <Link to="/" className="btn-primary">
          Volver al inicio
        </Link>
      </section>
    )
  }

  return (
    <section className="confirmation-page">
      <div className="confirmation-header">
        <div className="success-icon">✅</div>
        <h1>¡Compra Completada!</h1>
        <p className="success-message">Tu pedido ha sido procesado exitosamente</p>
      </div>

      <div className="confirmation-container">
        {/* Información del pedido */}
        <div className="order-info">
          <h2>Información del Pedido</h2>

          <div className="info-section">
            <div className="info-row">
              <span className="label">ID del Pedido:</span>
              <span className="value highlight">{order.id}</span>
            </div>
            <div className="info-row">
              <span className="label">Fecha:</span>
              <span className="value">
                {new Date(order.date).toLocaleDateString('es-PE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Estado:</span>
              <span className="value status-completed">🎉 {order.status.toUpperCase()}</span>
            </div>
          </div>

          {/* Información del cliente */}
          <h2>Información del Cliente</h2>

          <div className="info-section">
            <div className="info-row">
              <span className="label">Nombre:</span>
              <span className="value">
                {order.customer.firstName} {order.customer.lastName}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{order.customer.email}</span>
            </div>
            <div className="info-row">
              <span className="label">Teléfono:</span>
              <span className="value">{order.customer.phone}</span>
            </div>
            <div className="info-row">
              <span className="label">Dirección:</span>
              <span className="value">
                {order.customer.address}, {order.customer.city} {order.customer.zipCode}
              </span>
            </div>
          </div>

          {/* Productos comprados */}
          <h2>Productos Comprados</h2>

          <div className="products-list">
            {order.items.map((item) => (
              <div key={item.id} className="product-item">
                <img src={item.image} alt={item.title} />
                <div className="product-details">
                  <h4>{item.title}</h4>
                  <p className="category">{item.category}</p>
                </div>
                <div className="product-quantity">
                  <span>Cantidad: {item.quantity}</span>
                </div>
                <div className="product-price">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen de costos */}
        <aside className="cost-summary">
          <h2>Desglose de Costos</h2>

          <div className="cost-section">
            <div className="cost-row">
              <span>Subtotal:</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="cost-row discount">
                <span>Descuento Aplicado:</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="cost-row">
              <span>IGV (18%):</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="cost-row total">
              <span>Total Pagado:</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Próximos pasos */}
          <div className="next-steps">
            <h3>📋 Próximos Pasos</h3>
            <ol>
              <li>Confirma tu email para recibir el comprobante</li>
              <li>Prepárate para recibir tu pedido en 3-5 días hábiles</li>
              <li>Recibe una notificación de envío cuando se despache tu paquete</li>
            </ol>
          </div>

          {/* Información útil */}
          <div className="help-section">
            <h3>💬 ¿Necesitas Ayuda?</h3>
            <p>Si tienes alguna pregunta, contacta a nuestro equipo:</p>
            <p className="contact-info">📧 support@mitienda.com</p>
            <p className="contact-info">📞 +51 1 234-5678</p>
          </div>

          {/* Botones de acción */}
          <div className="action-buttons">
            <Link to="/" className="btn-primary">
              🏠 Ir al Inicio
            </Link>
            <Link to="/products" className="btn-secondary">
              🛍️ Continuar Comprando
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Confirmation