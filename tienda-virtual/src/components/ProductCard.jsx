import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/helpers'
import '../styles/productCard.css'

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description.substring(0, 80)}...</p>
        <p className="product-price">{formatPrice(product.price)}</p>

        <div className="product-card-buttons">
          <Link to={`/product/${product.id}`} className="btn-secondary">
            Ver detalle
          </Link>

          <button className="btn-primary" onClick={() => addToCart(product)}>
            Agregar 🛒
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
