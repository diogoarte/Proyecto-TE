import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useProductDetail } from '../hooks/useProducts'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/helpers'
import '../styles/productDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const { product, loading, error } = useProductDetail(id)
  const addToCart = useCartStore((state) => state.addToCart)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  if (loading) {
    return <section className="loading">⏳ Cargando producto...</section>
  }

  if (error || !product) {
    return (
      <section className="error">
        <h1>❌ Producto no encontrado</h1>
        <p>El producto que buscas no existe.</p>
        <Link to="/products" className="btn-primary">
          Volver al catálogo
        </Link>
      </section>
    )
  }

  return (
    <section className="product-detail">
      <Link to="/products" className="back-link">
        ← Volver al catálogo
      </Link>

      <div className="product-detail-card">
        <div className="product-detail-image-container">
          <img src={product.image} alt={product.title} className="product-detail-image" />
        </div>

        <div className="product-detail-info">
          <p className="product-detail-category">{product.category}</p>
          <h1 className="product-detail-title">{product.title}</h1>

          <div className="product-rating">
            <span className="rating">⭐ 4.5/5</span>
            <span className="reviews">(120 reseñas)</span>
          </div>

          <p className="product-detail-price">{formatPrice(product.price)}</p>

          <p className="product-detail-description">{product.description}</p>

          <div className="product-quantity">
            <label htmlFor="quantity">Cantidad:</label>
            <div className="quantity-controls">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-btn"
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="quantity-input"
              />
              <button onClick={() => setQuantity(quantity + 1)} className="quantity-btn">
                +
              </button>
            </div>
            <span className="subtotal">
              Subtotal: {formatPrice(product.price * quantity)}
            </span>
          </div>

          <div className="product-detail-buttons">
            <button
              className={`btn-primary ${addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {addedToCart ? '✅ Agregado al carrito' : '🛒 Agregar al carrito'}
            </button>

            <Link to="/cart" className="btn-secondary">
              Ver carrito
            </Link>
          </div>

          <div className="product-features">
            <h3>📋 Características</h3>
            <ul>
              <li>✓ Envío a toda la región</li>
              <li>✓ Garantía de calidad</li>
              <li>✓ Devolución en 30 días</li>
              <li>✓ Soporte al cliente 24/7</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
