import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { products } from '../data/products.js'
import './Shop.css'

function Shop() {
  const location = useLocation()
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  useEffect(() => {
    const categoryId = decodeURIComponent(location.hash.slice(1))
    if (!categoryId) return

    const timer = setTimeout(() => {
      document.getElementById(categoryId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [location.hash])

  const parsedMin = minPrice !== '' ? Number(minPrice) : 0
  const parsedMax = maxPrice !== '' ? Number(maxPrice) : Infinity

  const filteredProducts = products
    .map((category) => ({
      ...category,
      items: category.items.filter((product) => {
        const matchesMin = isNaN(parsedMin) || product.price >= parsedMin
        const matchesMax = isNaN(parsedMax) || product.price <= parsedMax
        return matchesMin && matchesMax
      }),
    }))
    .filter((category) => category.items.length > 0)

  const totalFilteredCount = filteredProducts.reduce(
    (acc, category) => acc + category.items.length,
    0
  )

  const handleResetFilter = () => {
    setMinPrice('')
    setMaxPrice('')
  }

  return (
    <main className="all-products-page">
      <header className="all-products-heading">
        <p className="all-products-label">THE LUMORA COLLECTION</p>
        <h1>All Products</h1>
        <p>Skincare for your everyday routine.</p>
      </header>

      {/* Filter by Price Range */}
      <section className="shop-filter-section" aria-label="Product filter">
        <div className="shop-filter-card">
          <div className="filter-header">
            <span className="filter-badge">FILTER</span>
            <h3>Price Range</h3>
          </div>

          <div className="filter-controls-row">
            <div className="filter-input-group">
              <label htmlFor="min-price-input">Min Price</label>
              <div className="filter-input-box">
                <span className="currency-tag">₹</span>
                <input
                  id="min-price-input"
                  type="number"
                  min="0"
                  placeholder="Min (e.g. 199)"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
            </div>

            <span className="filter-separator">to</span>

            <div className="filter-input-group">
              <label htmlFor="max-price-input">Max Price</label>
              <div className="filter-input-box">
                <span className="currency-tag">₹</span>
                <input
                  id="max-price-input"
                  type="number"
                  min="0"
                  max="5000"
                  placeholder="Max (e.g. 5000)"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-slider-group">
              <label htmlFor="max-price-slider">
                Max Price Slider: <strong>₹{maxPrice !== '' ? maxPrice : 5000}</strong>
              </label>
              <input
                id="max-price-slider"
                type="range"
                min="0"
                max="5000"
                step="50"
                value={maxPrice !== '' ? maxPrice : 5000}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            {(minPrice !== '' || maxPrice !== '') && (
              <button
                type="button"
                className="filter-reset-btn"
                onClick={handleResetFilter}
              >
                Reset Filter ✕
              </button>
            )}
          </div>

          <p className="filter-results-info">
            Showing {totalFilteredCount} product{totalFilteredCount === 1 ? '' : 's'}
            {(minPrice !== '' || maxPrice !== '') &&
              ` in price range ₹${minPrice !== '' ? minPrice : 0} – ₹${maxPrice !== '' ? maxPrice : '5000'}`}
          </p>
        </div>
      </section>

      {filteredProducts.length === 0 ? (
        <div className="no-products-found">
          <p>No products found in this price range.</p>
          <button
            type="button"
            className="filter-reset-btn"
            onClick={handleResetFilter}
          >
            Clear Filter
          </button>
        </div>
      ) : (
        filteredProducts.map((category) => (
          <section
            className="shop-category"
            id={category.category.toLowerCase().replace(/\s+/g, '-')}
            key={category.category}
          >
            <h2>{category.category}</h2>

            <div className="shop-product-grid">
              {category.items.map((product) => (
                <Link
                  to={`/product/${encodeURIComponent(product.name)}`}
                  className="shop-product-link"
                  key={product.name}
                >
                  <article className="shop-product-card">
                    <div className="shop-product-image">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                      />
                    </div>

                    <div className="shop-product-info">
                      <h3>{product.name}</h3>
                      <p className="shop-product-rating">
                        <span>★</span> {product.rating} / 5
                      </p>
                      <p className="shop-product-price">
                        ₹{product.price}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  )
}

export default Shop

