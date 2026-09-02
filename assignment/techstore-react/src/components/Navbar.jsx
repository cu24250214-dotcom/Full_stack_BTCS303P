import React from 'react';

/**
 * Task 7: Navbar Component
 * Displays logo, navigation links, and Cart toggle button with an item count badge.
 */
function Navbar({ activeView, setActiveView, cartItemCount }) {
  return (
    <header className="site-header">
      <div className="header-container">
        <a
          href="#home"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            setActiveView('products');
          }}
        >
          ⚡ TechStore
        </a>

        <nav>
          <button
            type="button"
            className={`nav-link ${activeView === 'products' ? 'active' : ''}`}
            onClick={() => setActiveView('products')}
          >
            Products
          </button>

          <button
            type="button"
            className={`nav-link cart-nav-btn ${activeView === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveView('cart')}
          >
            🛒 Cart
            <span className="cart-badge">{cartItemCount}</span>
          </button>

          <button
            type="button"
            className={`nav-link ${activeView === 'checkout' ? 'active' : ''}`}
            onClick={() => setActiveView('checkout')}
          >
            Checkout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
