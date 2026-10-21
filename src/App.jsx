import { useEffect, useState } from 'react'
import Cart from './Cart.jsx'
import ProductDetails from './ProductDetails.jsx'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import './Shop.css'
import Shop from './Shop.jsx'
import heroImage from './assets/lumora-hero.png'

function getSavedCartCount() {
  try {
    const saved = JSON.parse(localStorage.getItem('lumora-cart'))
    if (!Array.isArray(saved)) return 0
    return saved.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
  } catch {
    return 0
  }
}

function App() {
  const [cartCount, setCartCount] = useState(getSavedCartCount)

  useEffect(() => {
    const updateCount = () => setCartCount(getSavedCartCount())
    window.addEventListener('lumora-cart-updated', updateCount)
    window.addEventListener('storage', updateCount)
    return () => {
      window.removeEventListener('lumora-cart-updated', updateCount)
      window.removeEventListener('storage', updateCount)
    }
  }, [])

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
          <button className="icon-button" aria-label="Search">
            <svg viewBox="0 0 24 24" width="21" height="21"
              fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" />
            </svg>
          </button>

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
            {/* Product 1 */}
            <div className="product-card">
              <div className="product-image">
                <img
                  src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=85"
                  alt="Gentle Daily Cleanser"
                  loading="lazy"
                />
                <span className="product-tag">BESTSELLER</span>
              </div>
              <div className="product-info">
                <p className="product-category">CLEANSER</p>
                <h3>Gentle Daily Cleanser</h3>
                <p className="product-description">
                  A fresh start for your daily skincare routine.
                </p>
                <div className="product-bottom">
                  <span className="product-price">₹499</span>
                  <button className="add-to-cart">Add to Cart +</button>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="product-card">
              <div className="product-image">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=85"
                  alt="Radiance Face Serum"
                  loading="lazy"
                />
                <span className="product-tag">POPULAR</span>
              </div>
              <div className="product-info">
                <p className="product-category">SERUM</p>
                <h3>Radiance Face Serum</h3>
                <p className="product-description">
                  Lightweight care for a healthy-looking glow.
                </p>
                <div className="product-bottom">
                  <span className="product-price">₹699</span>
                  <button className="add-to-cart">Add to Cart +</button>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="product-card">
              <div className="product-image">
                <img
                  src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=85"
                  alt="Hydrating Face Cream"
                  loading="lazy"
                />
              </div>
              <div className="product-info">
                <p className="product-category">MOISTURIZER</p>
                <h3>Hydrating Face Cream</h3>
                <p className="product-description">
                  Everyday moisture for soft, comfortable skin.
                </p>
                <div className="product-bottom">
                  <span className="product-price">₹599</span>
                  <button className="add-to-cart">Add to Cart +</button>
                </div>
              </div>
            </div>

            {/* Product 4 */}
            <div className="product-card">
              <div className="product-image">
                <img
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=85"
                  alt="Daily Shield Sunscreen"
                  loading="lazy"
                />
                <span className="product-tag">DAILY ESSENTIAL</span>
              </div>
              <div className="product-info">
                <p className="product-category">SUNSCREEN</p>
                <h3>Daily Shield Sunscreen</h3>
                <p className="product-description">
                  An everyday essential for your sun-care routine.
                </p>
                <div className="product-bottom">
                  <span className="product-price">₹549</span>
                  <button className="add-to-cart">Add to Cart +</button>
                </div>
              </div>
            </div>
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
