import { useState } from 'react'
import products from '../data/products'
import ProductCard from '../components/ProductCard.jsx'

function Products() {
  const [categoryFilter, setCategoryFilter] = useState('') // Estado para el filtro

  // Filtramos los productos segun la categoria seleccionanda
  const filteredProducts = categoryFilter
	? products.filter((product) => product.category === categoryFilter)
	: products

  //OBtener todas las categorias unicas para el filtro
  const categories = [...new Set(products.map((product) => product.category))]

  return (
    <section>
      <h1>Catálogo de productos</h1>
      <p>Explora nuestros productos disponibles.</p>

      {/* Filtro de categoira */}
      <div calssNamme="filter-container">
	  <label htmlFor="category-filter">Filtrar por categoria:</label>
	  <select
	  	id="category-filter"
	  	value={categoryFilter}
	  	onChange={(e) => setCategoryFilter(e.target.value)}
	  >
	  	<option value="">Todos</option>
	  	{categories.map((category) => (
			<option key={category} value={category}>
				{category}
			</option>
		))}
	  </select>
      </div>


      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Products
