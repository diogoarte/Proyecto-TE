import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />

      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p>S/ {product.price}</p>

      <div className="product-card-buttons">
        <Link to={`/product/${product.id}`} className="btn-secondary">
          Ver detalle
        </Link>

        <button className="btn-primary" onClick={() => addToCart(product)}>
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}

export default ProductCard
