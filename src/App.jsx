import { useEffect, useState } from 'react'
import Cart from './pages/Cart.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Shop from './pages/Shop.jsx'
import heroImage from './assets/lumora-hero.png'
import { getSavedCart, saveCart } from './utils/cartUtils.js'

const featuredProducts = [
  {
    name: 'Gentle Daily Cleanser',
    category: 'CLEANSER',
    tag: 'BESTSELLER',
    price: 499,
    description: 'A fresh start for your daily skincare routine.',
    image:
      'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=85',
  },
  {
    name: 'Radiance Face Serum',
    category: 'SERUM',
    tag: 'POPULAR',
    price: 699,
    description: 'Lightweight care for a healthy-looking glow.',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=85',
  },
  {
    name: 'Hydrating Face Cream',
    category: 'MOISTURIZER',
    tag: '',
    price: 599,
    description: 'Everyday moisture for soft, comfortable skin.',
    image:
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=85',
  },
  {
    name: 'Daily Shield Sunscreen',
    category: 'SUNSCREEN',
    tag: 'DAILY ESSENTIAL',
    price: 549,
    description: 'An everyday essential for your sun-care routine.',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=85',
  },
]

function App() {
  const [cart, setCart] = useState(getSavedCart)

  useEffect(() => {
    const syncCart = () => setCart(getSavedCart())
    window.addEventListener('lumora-cart-updated', syncCart)
    window.addEventListener('storage', syncCart)
    return () => {
      window.removeEventListener('lumora-cart-updated', syncCart)
      window.removeEventListener('storage', syncCart)
    }
  }, [])

  const cartCount = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0
  )

  const updateCartItem = (product, newQuantity) => {
    const validQty = Math.max(0, newQuantity)
    const currentCart = getSavedCart()
    let updatedCart

    if (validQty === 0) {
      updatedCart = currentCart.filter((item) => item.name !== product.name)
    } else {
      const index = currentCart.findIndex((item) => item.name === product.name)
      if (index > -1) {
        updatedCart = currentCart.map((item, idx) =>
          idx === index ? { ...item, quantity: validQty } : item
        )
      } else {
        updatedCart = [
          ...currentCart,
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
    setCart(updatedCart)
  }

  return (
    <>
      {/* Navigation bar */}
      <header className="navbar">
        
        <Link to="/" className="logo">
          LUMORA<span>.</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <a href="/#about">About</a>
          <a href="/#contact">Contact Us</a>
        </nav>


        <div className="nav-actions">
          <Link to="/cart" className="icon-button cart-icon-button" aria-label="Shopping cart">
            <svg viewBox="0 0 24 24" width="21" height="21"
              fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20 8H6" />
              <circle cx="10" cy="21" r="1" />
              <circle cx="17" cy="21" r="1" />
            </svg>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </header>

      {/* Hero section */}
    <Routes>
    <Route path="/" element={<main>
      <section className="hero" id="home">
          <div className="hero-content">
            <p className="hero-label">
              PURE <span>•</span> NATURAL <span>•</span> EFFECTIVE
            </p>

            <h1>Healthy skin starts here.</h1>

            <p className="hero-description">
              Discover skincare that works with your skin,
              not against it. Gentle, effective and made
              for your natural glow.
            </p>

            <Link to="/shop" className="shop-button">
            Shop Now <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="hero-image">
              <img
                src={heroImage}
                alt="Lumora Radiant Serum and Nourishing Cream"
              />
          </div>
        </section>
        
        {/* Shop by Category */}
        <section className="categories" id="categories">
          <div className="categories-heading">
            <p className="section-label">YOUR ROUTINE, SIMPLIFIED</p>
            <h2>Shop by Category</h2>
            <p className="categories-description">
              Find the essentials your skin will love.
            </p>
          </div>

          <div className="category-grid">
            <a href="/shop#cleansers" className="category-card">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=85"
                  alt="Skincare cleanser products"
                  loading="lazy"
                />
                <span className="category-arrow">↗</span>
              </div>
              <div className="category-info">
                <h3>Cleansers</h3>
                <span>Explore collection</span>
              </div>
            </a>

            <a href="/shop#serums" className="category-card">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=85"
                  alt="Serum skincare products"
                  loading="lazy"
                />
                <span className="category-arrow">↗</span>
              </div>
              <div className="category-info">
                <h3>Serums</h3>
                <span>Explore collection</span>
              </div>
            </a>

            <a href="/shop#moisturizers"className="category-card">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=85"
                  alt="Moisturizing skincare cream"
                  loading="lazy"
                />
                <span className="category-arrow">↗</span>
              </div>
              <div className="category-info">
                <h3>Moisturizers</h3>
                <span>Explore collection</span>
              </div>
            </a>

            <a href="/shop#sunscreens" className="category-card">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=85"
                  alt="Daily skincare and sun protection products"
                  loading="lazy"
                />
                <span className="category-arrow">↗</span>
              </div>
              <div className="category-info">
                <h3>Sunscreens</h3>
                <span>Explore collection</span>
              </div>
            </a>
            {/* Lip Care */}
            <a href="/shop#lip-care" className="category-card">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=85"
                  alt="Lip care products"
                  loading="lazy"
                />
                <span className="category-arrow">↗</span>
              </div>
              <div className="category-info">
                <h3>Lip Care</h3>
                <span>Explore collection</span>
              </div>
            </a>

            {/* Face Wash */}
            <a href="/shop#face-wash" className="category-card">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1745141063798-7fa04698ea80?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                  alt="Face wash products"
                  loading="lazy"
                />
                <span className="category-arrow">↗</span>
              </div>
              <div className="category-info">
                <h3>Face Wash</h3>
                <span>Explore collection</span>
              </div>
            </a>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="featured-products" id="shop">
          <div className="featured-heading">
            <p className="section-label">YOUR SKINCARE ESSENTIALS</p>
            <h2>Featured Products</h2>
            <p className="featured-description">
              Thoughtfully chosen essentials for your everyday routine.
            </p>
          </div>

          <div className="product-grid">
            {featuredProducts.map((product) => {
              const cartItem = cart.find((item) => item.name === product.name)
              const quantity = cartItem ? cartItem.quantity : 0

              return (
                <div className="product-card" key={product.name}>
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />
                    {product.tag && (
                      <span className="product-tag">{product.tag}</span>
                    )}
                  </div>
                  <div className="product-info">
                    <p className="product-category">{product.category}</p>
                    <h3>{product.name}</h3>
                    <p className="product-description">
                      {product.description}
                    </p>
                    <div className="product-bottom">
                      <span className="product-price">₹{product.price}</span>

                      {quantity === 0 ? (
                        <button
                          type="button"
                          className="add-to-cart"
                          onClick={() => updateCartItem(product, 1)}
                        >
                          Add to Cart +
                        </button>
                      ) : (
                        <div className="card-cart-actions">
                          <button
                            type="button"
                            className="add-to-cart card-added-btn"
                            title="Added to cart"
                          >
                            Added ✓
                          </button>

                          <div className="card-quantity-stepper">
                            <button
                              type="button"
                              className="card-qty-btn"
                              onClick={() =>
                                updateCartItem(product, quantity - 1)
                              }
                              aria-label={`Decrease ${product.name} quantity`}
                            >
                              −
                            </button>
                            <span className="card-qty-value">{quantity}</span>
                            <button
                              type="button"
                              className="card-qty-btn"
                              onClick={() =>
                                updateCartItem(product, quantity + 1)
                              }
                              aria-label={`Increase ${product.name} quantity`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Customer Testimonials Section */}
        <section className="reviews-section" id="reviews">
          <div className="reviews-heading">
            <p className="section-label">WHAT OUR CUSTOMERS SAY</p>
            <h2>Customer Testimonials</h2>
            <p className="reviews-subtitle">
              A little love from our skincare community.
            </p>
          </div>

          <div className="reviews-grid">
            <div className="review-card review-featured">
              <div className="review-content">
                <h3>Priya Sharma</h3>
                <p className="review-location">Kolkata, West Bengal</p>
                <span className="review-stars">★★★★★</span>
                <p className="review-text">
                  "The cleanser feels so gentle on my skin. It has
                  become part of my everyday routine!"
                </p>
              </div>
            </div>

            <div className="review-card">
              <div className="review-content">
                <h3>Ananya Das</h3>
                <p className="review-location">Howrah, West Bengal</p>
                <span className="review-stars">★★★★★</span>
                <p className="review-text">
                  "The serum feels lightweight and absorbs beautifully."
                </p>
              </div>
            </div>

            <div className="review-card">
              <div className="review-content">
                <h3>Riya Sen</h3>
                <p className="review-location">Durgapur, West Bengal</p>
                <span className="review-stars">★★★★★</span>
                <p className="review-text">
                  "I love the simple routine and how hydrated my skin feels."
                </p>
              </div>
            </div>
          </div>
        </section>

      
      </main>} />

      <Route path="/shop" element={<Shop />} />

      <Route
        path="/product/:productName"
        element={<ProductDetails />}
      />

      <Route path="/cart" element={<Cart />} />
    </Routes>


    {/* Footer */}
    <footer className="footer">

          {/* Left Side: Brand */}
          <div className="footer-brand"id="about">
            <h2>Lumora.</h2>
            <p>
              Simple skincare, thoughtfully made for your everyday routine.
              Discover a gentler approach to healthy-looking skin.
            </p>
          </div>

          {/* Right Side: Links and Contact */}
          <div className="footer-details">

            <div className="footer-navigation">
              <h3>Quick Links</h3>
              <div className="footer-links">
                <a href="#home">Home</a>
                <Link to="/shop">Shop</Link>
                <a href="#reviews">Reviews</a>
              </div>
            </div>

            <div className="footer-contact" id="contact">
              <h3>Contact Us</h3>
              <p>Address: Kolkata, West Bengal, India</p>
              <p>Phone: +91 XXXXX XXXXX</p>
              <p>Email: hello@lumora.com</p>
            </div>

            <div className="footer-social">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" className="social-dot" />
                  </svg>
                </a>

                <a aria-label="Facebook">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.5C17.3 1.3 16.2 1.2 15 1.2c-3.5 0-5.5 2.1-5.5 5.7V9H6v4h3.5v8H14z" />
                  </svg>
                </a>

                <a aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM3.5 9h3V21h-3zM9 9h2.9v1.6h.1A3.2 3.2 0 0 1 15 8.8c3.2 0 3.8 2.1 3.8 4.8V21h-3v-6.6c0-1.6 0-3-1.9-3s-2.2 1.5-2.2 2.9V21H9z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>© 2026 Lumora Skincare. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default App
