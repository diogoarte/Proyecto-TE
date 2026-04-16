//tienda-virtual/src/pages/checkout/Checkout.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCartStore } from "../../store/cartStore";
import { storageService } from '../../services/storageService'
import { generateOrderId, formatPrice, validateEmail, validatePhone } from '../../utils/helpers'
import '../../styles/checkout.css'
function Checkout() {
  const navigate = useNavigate()
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  if (cart.length === 0) {
    return (
      <section className="checkout-empty">
        <h1>Tu carrito está vacío</h1>
        <p>Agrega productos antes de proceder al checkout</p>
        <Link to="/products" className="btn-primary">
          Volver a productos
        </Link>
      </section>
    )
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido'
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido'
    if (!validateEmail(formData.email)) newErrors.email = 'Email inválido'
    if (!validatePhone(formData.phone)) newErrors.phone = 'Teléfono debe tener 9 dígitos'
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida'
    if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'El código postal es requerido'
    if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/))
      newErrors.cardNumber = 'Número de tarjeta inválido (16 dígitos)'
    if (!formData.cardExpiry.match(/^\d{2}\/\d{2}$/))
      newErrors.cardExpiry = 'Formato: MM/YY'
    if (!formData.cardCVC.match(/^\d{3,4}$/)) newErrors.cardCVC = 'CVC inválido'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    // Simulación de procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const order = {
      id: generateOrderId(),
      date: new Date().toISOString(),
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
      },
      items: cart,
      subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      discount: cart.reduce((sum, item) => {
        if (item.quantity >= 5) {
          return sum + item.price * item.quantity * 0.05
        }
        return sum
      }, 0),
      tax: (cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.18) -
        (cart.reduce((sum, item) => {
          if (item.quantity >= 5) {
            return sum + item.price * item.quantity * 0.05
          }
          return sum
        }, 0) * 0.18),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.18 -
        (cart.reduce((sum, item) => {
          if (item.quantity >= 5) {
            return sum + item.price * item.quantity * 0.05
          }
          return sum
        }, 0)),
      status: 'completed',
    }

    storageService.saveOrder(order)
    clearCart()
    setLoading(false)

    navigate(`/confirmation/${order.id}`)
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = cart.reduce((sum, item) => {
    if (item.quantity >= 5) {
      return sum + item.price * item.quantity * 0.05
    }
    return sum
  }, 0)
  const tax = (subtotal - discount) * 0.18
  const total = subtotal - discount + tax

  return (
    <section className="checkout-page">
      <h1 className="page-title">💳 Checkout</h1>

      <div className="checkout-container">
        {/* Formulario */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          {/* Información personal */}
          <fieldset className="form-section">
            <legend>👤 Información Personal</legend>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Nombre *</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Juan"
                  className={errors.firstName ? 'input-error' : ''}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Apellido *</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Pérez"
                  className={errors.lastName ? 'input-error' : ''}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono *</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="900000000"
                  className={errors.phone ? 'input-error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>
          </fieldset>

          {/* Dirección */}
          <fieldset className="form-section">
            <legend>📍 Dirección de Entrega</legend>

            <div className="form-group">
              <label htmlFor="address">Dirección *</label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Calle Principal 123"
                className={errors.address ? 'input-error' : ''}
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Ciudad *</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Lima"
                  className={errors.city ? 'input-error' : ''}
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">Código Postal *</label>
                <input
                  id="zipCode"
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="15001"
                  className={errors.zipCode ? 'input-error' : ''}
                />
                {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
              </div>
            </div>
          </fieldset>

          {/* Información de pago */}
          <fieldset className="form-section">
            <legend>💳 Información de Pago</legend>

            <div className="form-group">
              <label htmlFor="cardNumber">Número de Tarjeta *</label>
              <input
                id="cardNumber"
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => {
                  let value = e.target.value.replace(/\s/g, '')
                  if (value.length <= 16 && /^\d*$/.test(value)) {
                    value = value.replace(/(\d{4})/g, '$1 ').trim()
                    handleInputChange({ target: { name: 'cardNumber', value } })
                  }
                }}
                placeholder="4532 1234 5678 9010"
                className={errors.cardNumber ? 'input-error' : ''}
              />
              {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cardExpiry">Vencimiento *</label>
                <input
                  id="cardExpiry"
                  type="text"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '')
                    if (value.length >= 2) {
                      value = value.substring(0, 2) + '/' + value.substring(2, 4)
                    }
                    handleInputChange({ target: { name: 'cardExpiry', value } })
                  }}
                  placeholder="12/25"
                  maxLength="5"
                  className={errors.cardExpiry ? 'input-error' : ''}
                />
                {errors.cardExpiry && <span className="error-text">{errors.cardExpiry}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cardCVC">CVV *</label>
                <input
                  id="cardCVC"
                  type="text"
                  name="cardCVC"
                  value={formData.cardCVC}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').substring(0, 4)
                    handleInputChange({ target: { name: 'cardCVC', value } })
                  }}
                  placeholder="123"
                  maxLength="4"
                  className={errors.cardCVC ? 'input-error' : ''}
                />
                {errors.cardCVC && <span className="error-text">{errors.cardCVC}</span>}
              </div>
            </div>
          </fieldset>

          {/* Botones de acción */}
          <div className="form-actions">
            <button type="submit" className="btn-primary btn-submit" disabled={loading}>
              {loading ? '⏳ Procesando...' : '✅ Completar Compra'}
            </button>
            <Link to="/cart" className="btn-secondary">
              ← Volver al carrito
            </Link>
          </div>
        </form>

        {/* Resumen de la compra */}
        <aside className="order-summary">
          <h2>Resumen de Compra</h2>

          <div className="summary-items">
            <h3>Productos:</h3>
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <span>
                  {item.quantity}x {item.title.substring(0, 25)}...
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="total-row discount">
                <span>Descuento:</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="total-row">
              <span>IGV (18%):</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="total-row final">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div className="security-badge">
            🔒 Pago 100% seguro
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Checkout