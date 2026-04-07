import { useParams, Link } from 'react-router-dom'
import products from '../data/products'
import { useCartStore } from '../store/cartStore'

function ProductDetail() {
  const { id } = useParams()
  const addToCart = useCartStore((state) => state.addToCart)

  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    return (
      <section>
        <h1>Producto no encontrado</h1>
        <p>El producto que buscas no existe.</p>
        <Link to="/products" className="btn-secondary">
          Volver al catálogo
        </Link>
      </section>
    )
  }

  return (
    <section className="product-detail">
      <div className="product-detail-card">
        <img
          src={product.image}
          alt={product.name}
          className="product-detail-image"
        />

        <div className="product-detail-info">
          <p className="product-detail-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-detail-price">S/ {product.price}</p>
          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-buttons">
            <button className="btn-primary" onClick={() => addToCart(product)}>
              Agregar al carrito
            </button>

            <Link to="/products" className="btn-secondary">
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
