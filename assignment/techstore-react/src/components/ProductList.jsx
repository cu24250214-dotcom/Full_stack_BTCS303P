import React from 'react';
import products from '../products';
import ProductCard from './ProductCard';

/**
 * Task 4: ProductList Component
 * Imports products.js, maps over the array, and renders one ProductCard per product
 * with a unique key (product.id).
 */
function ProductList({ onAddToCart }) {
  return (
    <section className="product-catalog-section">
      <div className="section-header">
        <h2 className="section-title">All Products</h2>
        <p className="section-subtitle">
          Explore our wide range of premium high-performance electronics & gadgets.
        </p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
