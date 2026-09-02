import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import Footer from './components/Footer';
import './App.css';

/**
 * Lab Sheet 3: TechStore React Application
 * COER University, Roorkee - Department of Computer Science & Engineering
 * Rebuilding with React (Components, Props, useState)
 */
function App() {
  // Task 5: Top-level cart state using useState
  const [cart, setCart] = useState([]);

  // Task 7: View toggle state (products | cart | checkout)
  const [activeView, setActiveView] = useState('products');

  // Toast notification state
  const [toast, setToast] = useState('');

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast('');
    }, 2500);
  };

  /**
   * Task 5: addToCart function
   * Updates state with { ...product, quantity }
   */
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    showToast(`Added "${product.name}" to cart!`);
  };

  /**
   * Task 6: removeFromCart function
   */
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  /**
   * Update item quantity in cart
   */
  const updateQuantity = (productId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: qty } : item
        )
      );
    }
  };

  /**
   * Clear cart state (used after successful checkout)
   */
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total cart items for navbar badge (Task 7)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      {/* Task 7: Navbar with cart badge and show/hide view toggling */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        cartItemCount={cartItemCount}
      />

      {/* Main Content with Conditional View Rendering */}
      <main className="main-content">
        {activeView === 'products' && (
          <>
            <Hero onShopNow={() => {
              const el = document.querySelector('.product-catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} />
            {/* Task 4 & 5: ProductList receives addToCart prop */}
            <ProductList onAddToCart={addToCart} />
          </>
        )}

        {activeView === 'cart' && (
          /* Task 6 & 9: Cart component with props and conditional empty state */
          <Cart
            cart={cart}
            onRemoveFromCart={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onProceedToCheckout={() => setActiveView('checkout')}
            onContinueShopping={() => setActiveView('products')}
          />
        )}

        {activeView === 'checkout' && (
          /* Task 8: Controlled CheckoutForm */
          <CheckoutForm
            cart={cart}
            onClearCart={clearCart}
            onReturnToProducts={() => setActiveView('products')}
          />
        )}
      </main>

      {/* Toast Feedback Notification */}
      {toast && (
        <div className="toast-notification">
          <span>✓</span>
          <span>{toast}</span>
        </div>
      )}

      <Footer setActiveView={setActiveView} />
    </div>
  );
}

export default App;
