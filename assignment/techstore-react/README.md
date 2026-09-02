# TechStore - React E-Commerce Application
**COER University, Roorkee — Department of Computer Science & Engineering**  
**Full Stack Web Development — Lab Sheet 3: Rebuilding with React (Components, Props, useState)**

---

## 🚀 Overview
TechStore has been converted from Vanilla JavaScript into a modular React application powered by **Vite**, featuring reusable functional components, top-level state management with `useState`, controlled form inputs, dynamic conditional rendering, and real-time cart interactions.

---

## 🛠️ Project Structure

```
assignment/techstore-react/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── products.js               # Mock catalog dataset (8 products)
    ├── App.jsx                   # Root component with lifted cart state & view routing
    ├── App.css                   # Global and component styles
    ├── index.css                 # Base resets and CSS custom properties
    ├── main.jsx                  # React DOM entrypoint
    └── components/
        ├── Navbar.jsx            # Header, navigation tabs & dynamic cart badge
        ├── Hero.jsx              # Banner section with CTA button
        ├── ProductList.jsx       # Imports products.js and maps with unique key
        ├── ProductCard.jsx       # Single product presentation with Add to Cart action
        ├── Cart.jsx              # Dynamic cart table, quantity handlers, grand total & empty state
        ├── CheckoutForm.jsx      # Controlled inputs with validation & order confirmation
        └── Footer.jsx            # Common footer component
```

---

## 📋 Implemented Tasks (Lab Sheet 3)

1. **Vite + React Setup**: Scaffolding with Vite React template.
2. **`products.js` Mock Data**: Exporting an array of 8 product objects.
3. **`ProductCard` Component**: Accepts `product` and `onAddToCart` props, renders product details and interactive button with visual feedback.
4. **`ProductList` Component**: Maps over `products.js` array and renders `ProductCard` with unique `key={product.id}` (not array index).
5. **Lifted State (`App.jsx`)**: Cart state initialized with `useState([])` in `App`, passing down `addToCart` handler.
6. **`Cart` Component**: Receives `cart`, `onRemoveFromCart`, and `onUpdateQuantity` props; calculates grand total via `reduce()`.
7. **Navbar with Cart Badge & Show/Hide View Logic**: Shows live total item count and switches views between Products, Cart, and Checkout.
8. **Controlled `CheckoutForm`**: Controlled inputs (`value` and `onChange` via `useState`) for Name, Address, City, Pincode (6 digits), Phone (10 digits), and Payment Method with inline error validation.
9. **Conditional Rendering**: Displays a clean "Your cart is empty" message when the cart is empty instead of the table.

---

## 🏃 Getting Started

### 1. Navigate to project directory
```bash
cd assignment/techstore-react
```

### 2. Install dependencies (if needed)
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```
