import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { formatPrice, calculateDiscount } from '../utils/helpers'
import '../styles/cart.css'

function Cart() {
  const cart = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const discount = cart.reduce((acc, item) => {
    if (item.quantity >= 5) {
      return acc + item.price * item.quantity * 0.05
    }
    return acc
  }, 0)
  const tax = (subtotal - discount) * 0.18
  const total = subtotal - discount + tax

  return (
    <section className="cart-page">
      <h1 className="page-title">🛒 Carrito de Compras</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p className="empty-message">Tu carrito está vacío 😅</p>
          <p className="empty-description">Agrega algunos productos para comenzar</p>
          <Link to="/products" className="btn-primary">
            Explorar productos
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items-section">
            <h2>Productos en tu carrito ({cart.length})</h2>
            <div className="cart-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p className="item-category">{item.category}</p>
                    <p className="item-price">{formatPrice(item.price)}</p>
                  </div>

                  <div className="cart-item-quantity">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="qty-btn"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="qty-btn"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-subtotal">
                    <p>{formatPrice(item.price * item.quantity)}</p>
                    {item.quantity >= 5 && (
                      <span className="discount-badge">-5% descuento</span>
                    )}
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Eliminar producto"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-summary-section">
            <div className="cart-summary">
              <h2>Resumen de compra</h2>

              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span>Descuento (5% por cantidad):</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="summary-row tax-row">
                <span>IGV (18%):</span>
                <span>{formatPrice(tax)}</span>
              </div>

              <div className="summary-row total-row">
                <span>Total:</span>
                <span className="total-amount">{formatPrice(total)}</span>
              </div>

              <div className="promo-info">
                💡 {cart.some((item) => item.quantity < 5)
                  ? '🎉 ¡Compra 5+ productos de un mismo artículo y obtén 5% de descuento!'
                  : '✨ ¡Descuento aplicado! Tienes artículos con 5%+ de descuento'}
              </div>

              <Link to="/checkout" className="btn-primary btn-checkout">
                Proceder al Pago
              </Link>

              <Link to="/products" className="btn-secondary btn-continue">
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Cart
