import React from 'react';

function Hero({ onShopNow }) {
  return (
    <section className="hero">
      <h1>Welcome to TechStore</h1>
      <p>
        Discover the latest high-performance electronics, gadgets, and accessories at unbeatable prices.
      </p>
      <button type="button" className="btn btn-primary btn-hero" onClick={onShopNow}>
        Shop Catalog Now
      </button>
    </section>
  );
}

export default Hero;
