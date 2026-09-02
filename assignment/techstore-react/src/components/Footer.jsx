import React from 'react';

function Footer({ setActiveView }) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-links">
          <button type="button" className="footer-link-btn" onClick={() => setActiveView('products')}>
            Products
          </button>
          <button type="button" className="footer-link-btn" onClick={() => setActiveView('cart')}>
            Cart
          </button>
          <button type="button" className="footer-link-btn" onClick={() => setActiveView('checkout')}>
            Checkout
          </button>
        </div>
        <p>Contact Us: support@techstore.com | Phone: +1 (800) 555-TECH</p>
        <p>&copy; {new Date().getFullYear()} TechStore Inc. Department of CSE, COER University.</p>
      </div>
    </footer>
  );
}

export default Footer;
