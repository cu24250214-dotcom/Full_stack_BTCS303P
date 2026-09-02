import React, { useState } from 'react';

/**
 * Task 8: CheckoutForm Component
 * Controlled inputs (value + onChange tied to useState) for:
 * Name, Address, City, Pincode, Phone, and Payment Method.
 * Includes validation, inline error messages, order confirmation, and cart clearing.
 */
function CheckoutForm({ cart, onClearCart, onReturnToProducts }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
    paymentMethod: 'credit_card'
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const grandTotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  // Handle controlled input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error for that field on change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required and cannot be empty.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required and cannot be empty.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    }

    // Pincode validation: exactly 6 digits
    const pincodePattern = /^\d{6}$/;
    if (!pincodePattern.test(formData.pincode.trim())) {
      newErrors.pincode = 'Pincode must be exactly 6 digits.';
    }

    // Phone validation: exactly 10 digits
    const cleanPhone = formData.phone.trim().replace(/^(\+91|91)?[\s-]?/, '');
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(cleanPhone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Capture details before clearing
      setOrderDetails({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        total: grandTotal.toFixed(2),
        payment: formData.paymentMethod.replace('_', ' ').toUpperCase(),
        itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
      });

      // Clear the cart state in App
      onClearCart();
      setOrderPlaced(true);
    }
  };

  if (orderPlaced && orderDetails) {
    return (
      <div className="checkout-container">
        <div className="order-success-card">
          <div className="success-icon">🎉</div>
          <h2>Order Placed!</h2>
          <p className="success-subtitle">
            Thank you, <strong>{orderDetails.name}</strong>! Your order has been placed successfully.
          </p>

          <div className="order-summary-box">
            <p><strong>Items Ordered:</strong> {orderDetails.itemCount}</p>
            <p><strong>Total Amount:</strong> ${orderDetails.total}</p>
            <p><strong>Payment Mode:</strong> {orderDetails.payment}</p>
            <p className="text-muted">A confirmation SMS has been sent to <strong>{orderDetails.phone}</strong>.</p>
          </div>

          <div className="success-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onReturnToProducts}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="section-title">Shipping & Payment Details</h1>

      <div className="checkout-content-grid">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="checkout-form" noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className={`form-control ${errors.name ? 'input-error' : ''}`}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. 123 Tech Street, Suite 400"
              className={`form-control ${errors.address ? 'input-error' : ''}`}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          {/* City */}
          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Roorkee"
              className={`form-control ${errors.city ? 'input-error' : ''}`}
            />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>

          {/* Pincode */}
          <div className="form-group">
            <label htmlFor="pincode">Pincode (6 digits) *</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              maxLength="6"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="e.g. 247667"
              className={`form-control ${errors.pincode ? 'input-error' : ''}`}
            />
            {errors.pincode && <span className="error-message">{errors.pincode}</span>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone Number (10 digits) *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              maxLength="15"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              className={`form-control ${errors.phone ? 'input-error' : ''}`}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          {/* Payment Method Radio Group */}
          <div className="form-group">
            <label className="form-section-label">Payment Method</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  checked={formData.paymentMethod === 'credit_card'}
                  onChange={handleChange}
                />
                <span>Credit / Debit Card</span>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleChange}
                />
                <span>UPI / Netbanking</span>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                />
                <span>Cash on Delivery (COD)</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary btn-submit">
            Place Order (${grandTotal.toFixed(2)})
          </button>
        </form>

        {/* Order Preview Sidebar */}
        <div className="checkout-summary-sidebar">
          <h3>Order Summary</h3>
          <div className="checkout-items-list">
            {cart.map((item) => (
              <div key={item.id} className="checkout-item-row">
                <div className="checkout-item-details">
                  <span className="checkout-item-title">{item.name}</span>
                  <span className="checkout-item-qty">Qty: {item.quantity}</span>
                </div>
                <span className="checkout-item-price">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="checkout-total-row">
            <span>Total Payable:</span>
            <span className="checkout-total-val">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
