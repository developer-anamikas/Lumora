
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products } from './Shop.jsx'
import './ProductDetails.css'

function ProductDetails() {
  const { productName } = useParams()
  const [added, setAdded] = useState(false)

  const allProducts = products.flatMap(
    (category) => category.items
  )

  const product = allProducts.find(
    (item) => item.name === decodeURIComponent(productName)
  )

  if (!product) {
    return (
      <main className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/shop">Back to Shop</Link>
      </main>
    )
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

        <button
          className="product-details-cart"
          onClick={() => setAdded(true)}
        >
          {added ? 'Added to Cart ✓' : 'Add to Cart'}
        </button>

        <p className="product-details-rating">
          ★ {product.rating} / 5
        </p>
      </div>
    </main>
  )
}

export default ProductDetails
