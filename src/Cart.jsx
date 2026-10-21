import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'

function getSavedCart() {
  try {
    const saved = JSON.parse(localStorage.getItem('lumora-cart'))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem('lumora-cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('lumora-cart-updated'))
  } catch (e) {
    console.error('Error saving cart:', e)
  }
}

function Cart() {
  const [cartItems, setCartItems] = useState(getSavedCart)

  useEffect(() => {
    const syncCart = () => setCartItems(getSavedCart())
    window.addEventListener('lumora-cart-updated', syncCart)
    window.addEventListener('storage', syncCart)

    return () => {
      window.removeEventListener('lumora-cart-updated', syncCart)
      window.removeEventListener('storage', syncCart)
    }
  }, [])

  const updateItemQuantity = (productName, newQuantity) => {
    const qty = parseInt(newQuantity, 10)
    if (isNaN(qty) || qty <= 0) {
      removeItem(productName)
      return
    }

    const updated = cartItems.map((item) =>
      item.name === productName ? { ...item, quantity: qty } : item
    )
    saveCart(updated)
    setCartItems(updated)
  }

  const removeItem = (productName) => {
    const updated = cartItems.filter((item) => item.name !== productName)
    saveCart(updated)
    setCartItems(updated)
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <main className="cart-page">
      <header className="cart-header">
        <p className="cart-label">YOUR SHOPPING BAG</p>
        <h1>Shopping Cart</h1>
      </header>

      {cartItems.length === 0 ? (
        <section className="cart-empty">
          <h2>Your cart is currently empty</h2>
          <p>Discover our gentle skincare essentials for your daily routine.</p>
          <Link to="/shop" className="cart-continue-btn">
            Explore Collection →
          </Link>
        </section>
      ) : (
        <>
          <div className="cart-table-wrapper">
            <table className="cart-table">
              <thead>
                <tr>
                  <th className="th-remove">REMOVE</th>
                  <th className="th-image">IMAGE</th>
                  <th className="th-product">PRODUCT</th>
                  <th className="th-price">PRICE</th>
                  <th className="th-quantity">QUANTITY</th>
                  <th className="th-subtotal">SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.name}>
                    <td className="td-remove">
                      <button
                        type="button"
                        className="cart-remove-btn"
                        onClick={() => removeItem(item.name)}
                        aria-label={`Remove ${item.name} from cart`}
                        title="Remove item"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                        </svg>
                      </button>
                    </td>

                    <td className="td-image">
                      <Link to={`/product/${encodeURIComponent(item.name)}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-product-img"
                        />
                      </Link>
                    </td>

                    <td className="td-product">
                      <Link
                        to={`/product/${encodeURIComponent(item.name)}`}
                        className="cart-product-title"
                      >
                        {item.name}
                      </Link>
                    </td>

                    <td className="td-price">₹{item.price}</td>

                    <td className="td-quantity">
                      <div className="cart-quantity-box">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() =>
                            updateItemQuantity(item.name, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <input
                          type="number"
                          min="1"
                          className="cart-qty-input"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItemQuantity(item.name, e.target.value)
                          }
                          aria-label={`Quantity for ${item.name}`}
                        />

                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() =>
                            updateItemQuantity(item.name, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="td-subtotal">
                      ₹{item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-bottom">
            <div className="cart-actions">
              <Link to="/shop" className="cart-continue-btn">
                ← Continue Shopping
              </Link>
            </div>

            <section className="cart-summary-box">
              <h3>Order Summary</h3>

              <div className="cart-summary-row">
                <span>Items ({totalItems})</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="cart-summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="cart-summary-total">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>

              <button
                type="button"
                className="cart-checkout-btn"
                onClick={() =>
                  alert('Thank you for trying Lumora! Checkout demo complete.')
                }
              >
                Proceed to Checkout
              </button>
            </section>
          </div>
        </>
      )}
    </main>
  )
}

export default Cart
