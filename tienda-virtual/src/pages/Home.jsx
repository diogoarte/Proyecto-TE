import { Link } from 'react-router-dom'
import '../styles/home.css'

function Home() {
  return (
    <section className="home">
      <div className="hero">
        <h1 className="hero-title">Bienvenido a Mi Tienda Virtual</h1>
        <p className="hero-subtitle">Descubre los mejores productos con envío rápido y seguro</p>

        <Link to="/products" className="btn-primary hero-btn">
          🛍️ Ver Catálogo
        </Link>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>⚡ Rápido</h3>
          <p>Procesa tu compra en segundos</p>
        </div>
        <div className="feature-card">
          <h3>🛡️ Seguro</h3>
          <p>Transacciones protegidas y datos encriptados</p>
        </div>
        <div className="feature-card">
          <h3>🚚 Entrega</h3>
          <p>Enviamos a toda la región</p>
        </div>
        <div className="feature-card">
          <h3>💳 Flexibles</h3>
          <p>Múltiples opciones de pago</p>
        </div>
      </div>

      <section className="promo">
        <h2>Promociones Especiales 🎉</h2>
        <p>Obtén descuentos de hasta 5% al comprar desde 5 productos</p>
        <Link to="/products" className="btn-secondary">
          Ver ofertas
        </Link>
      </section>
    </section>
  )
}

export default Home
