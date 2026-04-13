import { useState, useMemo } from 'react'
import { useProducts, useCategories } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import { searchProducts, sortProducts } from '../utils/helpers'
import '../styles/products.css'

function Products() {
  const { products, loading, error } = useProducts()
  const { categories } = useCategories()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('')

  // Aplicar filtros y ordenamiento
  const filteredProducts = useMemo(() => {
    let result = products

    // Filtrar por categoría
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Buscar por nombre o descripción
    if (searchQuery) {
      result = searchProducts(result, searchQuery)
    }

    // Ordenar
    if (sortBy) {
      result = sortProducts(result, sortBy)
    }

    return result
  }, [products, selectedCategory, searchQuery, sortBy])

  if (loading) {
    return <section className="loading">⏳ Cargando productos...</section>
  }

  if (error) {
    return <section className="error">❌ Error al cargar los productos: {error}</section>
  }

  return (
    <section className="products-page">
      <h1 className="page-title">📦 Catálogo de Productos</h1>

      <div className="filters-container">
        {/* Búsqueda */}
        <div className="filter-group">
          <label htmlFor="search">🔍 Buscar</label>
          <input
            id="search"
            type="text"
            placeholder="Busca por nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filtro de categoría */}
        <div className="filter-group">
          <label htmlFor="category">📂 Categoría</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Ordenamiento */}
        <div className="filter-group">
          <label htmlFor="sort">↕️ Ordenar</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="">Sin ordenar</option>
            <option value="price-asc">Precio (menor a mayor)</option>
            <option value="price-desc">Precio (mayor a menor)</option>
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
          </select>
        </div>

        {/* Contador de resultados */}
        <div className="results-count">
          Mostrando {filteredProducts.length} de {products.length} productos
        </div>
      </div>

      {/* Productos */}
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>😔 No encontramos productos que coincidan con tu búsqueda</p>
          <button
            className="btn-secondary"
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('')
              setSortBy('')
            }}
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Products
