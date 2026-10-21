
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products } from './Shop.jsx'
import './ProductDetails.css'

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

function ProductDetails() {
  const { productName } = useParams()
  const decodedName = decodeURIComponent(productName || '')

  const allProducts = products.flatMap((category) => category.items)
  const product = allProducts.find((item) => item.name === decodedName)

  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    if (!product) return

    const syncQuantity = () => {
      const cart = getSavedCart()
      const existing = cart.find((item) => item.name === product.name)
      setQuantity(existing ? existing.quantity : 0)
    }

    syncQuantity()

    window.addEventListener('lumora-cart-updated', syncQuantity)
    window.addEventListener('storage', syncQuantity)

    return () => {
      window.removeEventListener('lumora-cart-updated', syncQuantity)
      window.removeEventListener('storage', syncQuantity)
    }
  }, [product])

  if (!product) {
    return (
      <main className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/shop">Back to Shop</Link>
      </main>
    )
  }

  const updateQuantity = (newQty) => {
    const validQty = Math.max(0, newQty)
    setQuantity(validQty)

    const cart = getSavedCart()
    let updatedCart

    if (validQty === 0) {
      updatedCart = cart.filter((item) => item.name !== product.name)
    } else {
      const index = cart.findIndex((item) => item.name === product.name)
      if (index > -1) {
        updatedCart = cart.map((item, idx) =>
          idx === index ? { ...item, quantity: validQty } : item
        )
      } else {
        updatedCart = [
          ...cart,
          {
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: validQty,
          },
        ]
      }
    }

    saveCart(updatedCart)
  }

  const handleAddToCartClick = () => {
    if (quantity === 0) {
      updateQuantity(1)
    }
  }

  const handleIncrease = () => {
    updateQuantity(quantity + 1)
  }

  const handleDecrease = () => {
    updateQuantity(quantity - 1)
  }

  return (
    <main className="product-details-page">
      <div className="product-details-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-details-info">
        <p className="product-details-label">LUMORA SKINCARE</p>

        <h1>{product.name}</h1>

        <p className="product-details-price">
          ₹{product.price}
        </p>

        <p className="product-details-description">
          {product.description ||
            `Discover gentle, everyday skincare with ${product.name}. Thoughtfully selected to make your daily skincare routine simple and refreshing.`}
        </p>

        <div className="product-details-actions">
          <button
            type="button"
            className={`product-details-cart ${quantity > 0 ? 'is-added' : ''}`}
            onClick={handleAddToCartClick}
          >
            {quantity > 0 ? 'Added to Cart ✓' : 'Add to Cart'}
          </button>

          {quantity > 0 && (
            <div className="product-details-quantity">
              <button
                type="button"
                className="quantity-btn"
                onClick={handleDecrease}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span className="quantity-value">{quantity}</span>

              <button
                type="button"
                className="quantity-btn"
                onClick={handleIncrease}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>

        <p className="product-details-rating">
          ★ {product.rating} / 5
        </p>
      </div>
    </main>
  )
}

export default ProductDetails

