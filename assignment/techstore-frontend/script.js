/**
 * TechStore JavaScript - Lab Sheet 2: Making It Interactive
 * Department of Computer Science & Engineering - Full Stack Development
 */

// 1. Product Catalog Array (At least 8 products)
const products = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    description: "Premium audio clarity with active noise cancellation and soft earcups."
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
    description: "Track steps, heart rate, sleep metrics, and workout routines effortlessly."
  },
  {
    id: 3,
    name: "Pro Ultra Thin Laptop",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60",
    description: "Fast processing power for creative professionals and daily work."
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60",
    description: "Rugged outdoor speaker with rich bass and 15 hours playback."
  },
  {
    id: 5,
    name: "Ergonomic Wireless Mouse",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60",
    description: "High-precision optical sensor with customizable DPI buttons."
  },
  {
    id: 6,
    name: "RGB Mechanical Keyboard",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
    description: "Tactile mechanical switches with customizable per-key RGB backlighting."
  },
  {
    id: 7,
    name: "27\" 4K UHD Monitor",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60",
    description: "Ultra-crisp 144Hz IPS panel with HDR400 for stunning visual detail."
  },
  {
    id: 8,
    name: "True Wireless Earbuds",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60",
    description: "Compact charging case with touch controls and crystal clear voice calls."
  }
];

/**
 * Safe retrieval and automatic sanitization of cart array from localStorage
 */
function getCart() {
  try {
    const data = localStorage.getItem('cart');
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];

    const sanitizedCart = [];
    parsed.forEach(item => {
      if (!item) return;

      let prodId = null;
      let qty = 1;

      if (typeof item === 'number' || typeof item === 'string') {
        prodId = parseInt(item, 10);
      } else if (typeof item === 'object') {
        prodId = parseInt(item.id, 10);
        qty = parseInt(item.quantity, 10) || 1;
      }

      // Check if product exists in catalog
      const catalogProduct = products.find(p => p.id === prodId);

      if (catalogProduct) {
        sanitizedCart.push({
          id: catalogProduct.id,
          name: catalogProduct.name,
          price: Number(catalogProduct.price),
          image: catalogProduct.image,
          quantity: Math.max(1, qty)
        });
      } else if (typeof item === 'object' && item.name && typeof item.name === 'string' && item.name !== 'undefined' && !isNaN(parseFloat(item.price))) {
        sanitizedCart.push({
          id: prodId || Date.now(),
          name: item.name,
          price: parseFloat(item.price),
          image: item.image || '',
          quantity: Math.max(1, qty)
        });
      }
      // Any corrupted, NaN, or undefined items are automatically filtered out
    });

    // If corrupted items were detected and purged, sync back to localStorage
    if (JSON.stringify(sanitizedCart) !== data) {
      localStorage.setItem('cart', JSON.stringify(sanitizedCart));
    }

    return sanitizedCart;
  } catch (error) {
    console.error('Error parsing cart from localStorage:', error);
    localStorage.removeItem('cart');
    return [];
  }
}

/**
 * Persist cart array to localStorage and refresh UI
 */
function saveCart(cart) {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
  updateCartBadge();
}

/**
 * Task 8: Update cart item count badge in navbar on every page
 */
function updateCartBadge() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const badgeElements = document.querySelectorAll('.cart-badge');
  badgeElements.forEach(badge => {
    badge.textContent = totalCount;
  });
}

/**
 * Display toast popup notification when product is added
 */
function showToast(message) {
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.remove();
  }, 2500);
}

/**
 * Task 3: Add product to cart by ID
 */
function addToCart(productId, quantity = 1, buttonElement = null) {
  const parsedId = parseInt(productId, 10);
  const product = products.find(p => p.id === parsedId);
  if (!product) {
    console.warn('Product not found for ID:', productId);
    return;
  }

  const cart = getCart();
  const existingItem = cart.find(item => item.id === parsedId);

  const addQty = Math.max(1, parseInt(quantity, 10) || 1);
  if (existingItem) {
    existingItem.quantity = (Number(existingItem.quantity) || 0) + addQty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      quantity: addQty
    });
  }

  saveCart(cart);
  showToast(`Added "${product.name}" to cart!`);

  // Button feedback animation
  if (buttonElement) {
    const originalText = buttonElement.innerHTML;
    buttonElement.innerHTML = '✓ Added!';
    buttonElement.style.backgroundColor = '#10b981';
    buttonElement.style.color = '#ffffff';
    buttonElement.disabled = true;
    setTimeout(() => {
      buttonElement.innerHTML = originalText;
      buttonElement.style.backgroundColor = '';
      buttonElement.style.color = '';
      buttonElement.disabled = false;
    }, 900);
  }

  // If currently on cart page, re-render cart table
  if (document.querySelector('.cart-table-wrapper')) {
    renderCart();
  }
}

/**
 * Task 2: Dynamically render product cards on products.html
 */
function renderProducts() {
  const productGrid = document.querySelector('.product-grid');
  // Avoid re-rendering index.html's featured grid if hero banner exists
  if (!productGrid || document.querySelector('.hero')) return;

  productGrid.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img">
      <h3>${product.name}</h3>
      <p class="description">${product.description}</p>
      <div class="product-footer">
        <span class="price">$${product.price.toFixed(2)}</span>
        <button type="button" class="btn btn-primary btn-add-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(card);
  });

  // Attach event listeners to Add to Cart buttons
  const addButtons = productGrid.querySelectorAll('.btn-add-cart');
  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = parseInt(btn.getAttribute('data-id'), 10);
      addToCart(id, 1, btn);
    });
  });
}

/**
 * Task 5: Recalculates cart grand total using reduce()
 */
function calculateTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.quantity, 10) || 0;
    return sum + (price * qty);
  }, 0);
}

/**
 * Update quantity of a specific item in cart
 */
function updateItemQuantity(productId, newQuantity) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, parseInt(newQuantity, 10) || 1);
    saveCart(cart);
    renderCart();
  }
}

/**
 * Remove an item from the cart
 */
function removeItemFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
}

/**
 * Task 4 & 5: On cart.html, dynamically render cart items, quantity input, remove button & grand total
 */
function renderCart() {
  const cartTableWrapper = document.querySelector('.cart-table-wrapper');
  const cartActions = document.querySelector('.cart-actions');
  if (!cartTableWrapper) return;

  const cart = getCart();

  // If cart is empty, show empty state message
  if (cart.length === 0) {
    cartTableWrapper.innerHTML = `
      <div style="padding: 3.5rem 2rem; text-align: center; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 0.75rem;">🛒</div>
        <h2 style="margin-bottom: 0.5rem; color: var(--text-color);">Your Cart is Empty</h2>
        <p style="margin-bottom: 1.5rem;">Looks like you haven't added anything to your cart yet.</p>
        <a href="products.html" class="btn btn-primary">Start Shopping</a>
      </div>
    `;
    if (cartActions) {
      cartActions.style.display = 'none';
    }
    return;
  }

  // Restore cart actions if previously hidden
  if (cartActions) {
    cartActions.style.display = 'flex';
  }

  // Render Table Structure
  cartTableWrapper.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Unit Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  `;

  const tbody = cartTableWrapper.querySelector('tbody');

  // Render each item row
  cart.forEach(item => {
    const row = document.createElement('tr');
    const itemPrice = Number(item.price);
    const itemQty = Number(item.quantity);
    const subtotal = (itemPrice * itemQty).toFixed(2);

    row.innerHTML = `
      <td>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <img src="${item.image}" alt="${item.name}" style="width: 55px; height: 55px; object-fit: cover; border-radius: 6px; background-color: #f1f5f9;">
          <strong>${item.name}</strong>
        </div>
      </td>
      <td>$${itemPrice.toFixed(2)}</td>
      <td>
        <input type="number" min="1" max="99" value="${itemQty}" class="cart-qty-input" data-id="${item.id}">
      </td>
      <td><strong>$${subtotal}</strong></td>
      <td>
        <button type="button" class="btn-remove" data-id="${item.id}">Remove</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Append Grand Total Row
  const totalRow = document.createElement('tr');
  totalRow.className = 'grand-total-row';
  totalRow.innerHTML = `
    <td colspan="3" style="text-align: right; font-weight: 700;">Grand Total:</td>
    <td colspan="2" id="cart-grand-total" style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color);">$${calculateTotal().toFixed(2)}</td>
  `;
  tbody.appendChild(totalRow);

  // Quantity change listeners
  const qtyInputs = tbody.querySelectorAll('.cart-qty-input');
  qtyInputs.forEach(input => {
    input.addEventListener('change', () => {
      const id = parseInt(input.getAttribute('data-id'), 10);
      let newQty = parseInt(input.value, 10);
      if (isNaN(newQty) || newQty < 1) {
        newQty = 1;
        input.value = 1;
      }
      updateItemQuantity(id, newQty);
    });
  });

  // Remove button listeners
  const removeButtons = tbody.querySelectorAll('.btn-remove');
  removeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      removeItemFromCart(id);
    });
  });
}

/**
 * Task 6 & 7: Form Validation and Order Confirmation on checkout.html
 */
function setupCheckoutForm() {
  const form = document.querySelector('.checkout-form');
  if (!form) return;

  // Disable default browser validation to show custom inline errors
  form.setAttribute('novalidate', 'true');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Remove existing inline errors
    const existingErrors = form.querySelectorAll('.error-message');
    existingErrors.forEach(err => err.remove());
    const invalidInputs = form.querySelectorAll('.input-error');
    invalidInputs.forEach(input => input.classList.remove('input-error'));

    const nameInput = document.getElementById('name');
    const addressInput = document.getElementById('address');
    const pincodeInput = document.getElementById('pincode');
    const phoneInput = document.getElementById('phone');

    let isValid = true;

    // Helper to display inline error message
    function showInlineError(inputElement, message) {
      if (!inputElement) return;
      inputElement.classList.add('input-error');
      const errorSpan = document.createElement('span');
      errorSpan.className = 'error-message';
      errorSpan.textContent = message;
      inputElement.parentNode.appendChild(errorSpan);
    }

    // 1. Name validation (must not be empty)
    if (!nameInput.value.trim()) {
      showInlineError(nameInput, 'Name is required and cannot be empty.');
      isValid = false;
    }

    // 2. Address validation (must not be empty)
    if (!addressInput.value.trim()) {
      showInlineError(addressInput, 'Address is required and cannot be empty.');
      isValid = false;
    }

    // 3. Pincode validation (must be exactly 6 digits)
    const pincodePattern = /^\d{6}$/;
    if (!pincodePattern.test(pincodeInput.value.trim())) {
      showInlineError(pincodeInput, 'Pincode must be exactly 6 digits.');
      isValid = false;
    }

    // 4. Phone validation (must be exactly 10 digits)
    const phoneDigits = phoneInput.value.trim().replace(/^(\+91|91)?[\s-]?/, '');
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phoneDigits)) {
      showInlineError(phoneInput, 'Phone number must be exactly 10 digits.');
      isValid = false;
    }

    // Task 7: On successful validation, show confirmation message and clear cart from localStorage
    if (isValid) {
      const customerName = nameInput.value.trim();
      const customerPhone = phoneInput.value.trim();

      // Clear cart from localStorage
      saveCart([]);

      // Show confirmation message on the page
      const checkoutContainer = document.querySelector('.checkout-container');
      if (checkoutContainer) {
        checkoutContainer.innerHTML = `
          <div class="order-success">
            <h2>🎉 Order Placed!</h2>
            <p>Thank you, <strong>${customerName}</strong>! Your order has been placed successfully.</p>
            <p style="margin-top: 0.5rem; color: var(--text-muted);">A confirmation SMS has been dispatched to <strong>${customerPhone}</strong>.</p>
            <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="index.html" class="btn btn-secondary">← Back to Home</a>
              <a href="products.html" class="btn btn-primary">Shop More Items</a>
            </div>
          </div>
        `;
      }
    }
  });
}

/**
 * Handle Product Detail page Add to Cart
 */
function setupProductDetail() {
  const detailBtn = document.querySelector('.detail-info .btn-primary, #btn-detail-add');
  const qtyInput = document.getElementById('quantity');
  if (detailBtn) {
    detailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const qty = qtyInput ? (parseInt(qtyInput.value, 10) || 1) : 1;
      // Headphone product (id: 1)
      addToCart(1, qty, detailBtn);
    });
  }
}

/**
 * Setup Add to Cart buttons that exist on home page or other pages
 */
function setupGlobalAddButtons() {
  const genericAddButtons = document.querySelectorAll('.hero ~ section .btn-add-cart, main .btn-add-cart');
  genericAddButtons.forEach(btn => {
    // Avoid double attaching if inside dynamically rendered product-grid
    if (!btn.closest('.product-grid')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = parseInt(btn.getAttribute('data-id'), 10);
        addToCart(id, 1, btn);
      });
    }
  });
}

// Multi-tab synchronization
window.addEventListener('storage', (e) => {
  if (e.key === 'cart') {
    updateCartBadge();
    if (document.querySelector('.cart-table-wrapper')) {
      renderCart();
    }
  }
});

// Initialise everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderProducts();
  renderCart();
  setupCheckoutForm();
  setupProductDetail();
  setupGlobalAddButtons();
});
