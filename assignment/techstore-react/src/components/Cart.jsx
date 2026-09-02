import React from 'react';

/**
 * Tasks 6 & 9: Cart Component
 * - Receives cart array and removeFromCart / updateQuantity functions as props
 * - Renders each item with quantity, unit price, subtotal, and grand total
 * - Conditional rendering: if cart is empty, renders empty cart message instead of table
 */
function Cart({ cart, onRemoveFromCart, onUpdateQuantity, onProceedToCheckout, onContinueShopping }) {
  // Task 6: Calculate Grand Total using reduce()
  const grandTotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  // Task 9: Conditional Rendering for Empty Cart
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h1 className="section-title">Your Shopping Cart</h1>
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onContinueShopping}
          >
            ← Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="section-title">Your Shopping Cart</h1>

      <div className="cart-table-wrapper">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              const subtotal = Number(item.price) * Number(item.quantity);

              return (
                <tr key={item.id}>
                  <td>
                    <div className="cart-item-info">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-img"
                      />
                      <span className="cart-item-name">{item.name}</span>
                    </div>
                  </td>
                  <td>${Number(item.price).toFixed(2)}</td>
                  <td>
                    <div className="quantity-controls">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={item.quantity}
                        onChange={(e) =>
                          onUpdateQuantity(
                            item.id,
                            Math.max(1, parseInt(e.target.value, 10) || 1)
                          )
                        }
                        className="cart-qty-input"
                      />
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>${subtotal.toFixed(2)}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* Grand Total Row */}
            <tr className="grand-total-row">
              <td colSpan="3" className="text-right">
                Grand Total:
              </td>
              <td colSpan="2" className="grand-total-amount">
                ${grandTotal.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cart Action Buttons */}
      <div className="cart-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onContinueShopping}
        >
          ← Continue Shopping
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onProceedToCheckout}
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
}

export default Cart;
