import products from '../data/products'
import ProductCard from '../components/ProductCard.jsx'

function Products() {
  return (
    <section>
      <h1>Catálogo de productos</h1>
      <p>Explora nuestros productos disponibles.</p>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Products
