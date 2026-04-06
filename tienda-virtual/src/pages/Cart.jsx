import { useCartStore } from '../store/cartStore'

function Cart() {
  const cart = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <section>
      <h1>Carrito de compras</h1>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Categoría: {item.category}</p>
                  <p>Precio: S/ {item.price}</p>
                  <p>Subtotal: S/ {item.price * item.quantity}</p>

                  <div className="cart-actions">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: S/ {total}</h2>
          </div>
        </>
      )}
    </section>
  )
}

export default Cart
