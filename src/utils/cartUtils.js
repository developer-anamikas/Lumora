// Helper functions for reading and writing cart items in localStorage

export function getSavedCart() {
  try {
    const saved = JSON.parse(localStorage.getItem('lumora-cart'))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem('lumora-cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('lumora-cart-updated'))
  } catch {
    // Fail silently in environments where localStorage is restricted
  }
}
