import React, { useState } from 'react';

/**
 * Task 3: ProductCard Component
 * Receives a single product as props and renders its image, name, price, description, and an 'Add to Cart' button.
 */
function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddClick = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 800);
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-img"
        loading="lazy"
      />
      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <div className="product-footer">
        <span className="price">${Number(product.price).toFixed(2)}</span>
        <button
          type="button"
          className={`btn ${isAdded ? 'btn-success' : 'btn-primary'}`}
          onClick={handleAddClick}
          disabled={isAdded}
        >
          {isAdded ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
