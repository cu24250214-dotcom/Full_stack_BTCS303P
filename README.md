# Full Stack Development Lab (BTCS303P)

> **Course:** Full Stack Development Lab — BTCS303P  
> **Student:** Akshit Negi  
> **Enrollment No.:** CU24250214  
> **University:** COER University  
> **GitHub:** [@cu24250214-dotcom](https://github.com/cu24250214-dotcom)

A collection of lab experiments, assignments, and full-stack projects for the **BTCS303P – Full Stack Development Lab** course, covering front-end (HTML/CSS/JS/React), back-end (Node.js/Express), and database (SQL/MongoDB) concepts.

---

## 📑 Table of Contents

- [About](#-about)
- [Tech Stack](#️-tech-stack)
- [Repository Structure](#-repository-structure)
  - [Root Level](#-root-level)
  - [Assignment Projects](#-assignment-projects)
    - [techstore-frontend](#1-techstore-frontend--vanilla-js)
    - [techstore-react](#2-techstore-react--react--vite)
- [Lab Sheets](#-lab-sheets)
- [Assignments](#-assignments)
- [Other Resources](#-other-resources)
- [Getting Started](#-getting-started)
- [Author](#-author)

---

## 📌 About

This repository contains all practical lab sheets, assignments, and projects completed as part of the **BTCS303P – Full Stack Development Lab** course at Chandigarh University. It includes:

- Lab sheet solutions (Labs 3–7)
- Practical assignment solutions
- Two full-stack projects: a **Vanilla JS TechStore** and a **React + Vite TechStore**
- SQL practice materials

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Front-end** | HTML5, CSS3, JavaScript (ES6+), React 18 |
| **Build Tool** | Vite |
| **Back-end** | Node.js, Express.js |
| **Database** | MongoDB, MySQL, SQL |
| **Tools** | Git, GitHub, VS Code, Postman |

---

## 📂 Repository Structure

```
Full_stack_BTCS303P/
│
├── 📄 .gitignore
├── 📄 README.md
│
├── 📋 Lab Sheets
│   ├── labsheet_3_Akshit_Negi_CU24250214.pdf
│   ├── LAB SHEET 4.pdf
│   ├── Full Stack lab sheet 5_Akshit_Negi.pdf
│   ├── LabSheet-6 Full Stack.pdf.pdf
│   └── Labsheet 7_Solution_.pdf
│
├── 📝 Assignments (PDFs)
│   ├── BTCS303P-AS01-Solution.pdf
│   └── BTCS303P-AS02-Solution.pdf
│
├── 📦 SQL_Practice_Sheet.pdf
│
└── 📁 assignment/
    │
    ├── 📁 techstore-frontend/          ← Vanilla HTML/CSS/JS Project
    │   ├── index.html                  (Homepage)
    │   ├── product.html                (Products page)
    │   ├── products.html               (Products listing)
    │   ├── product-detail.html         (Product detail view)
    │   ├── cart.html                   (Shopping cart)
    │   ├── checkout.html               (Checkout page)
    │   ├── script.js                   (Main JavaScript logic)
    │   └── style.css                   (Global styles)
    │
    └── 📁 techstore-react/             ← React + Vite Project
        ├── index.html
        ├── package.json
        ├── vite.config.js
        ├── .gitignore
        ├── .oxlintrc.json
        │
        ├── 📁 public/
        │   ├── favicon.svg
        │   └── icons.svg
        │
        └── 📁 src/
            ├── App.jsx                 (Root component)
            ├── App.css
            ├── main.jsx                (Entry point)
            ├── index.css
            ├── products.js             (Product data)
            │
            ├── 📁 assets/
            │   ├── hero.png
            │   ├── react.svg
            │   └── vite.svg
            │
            └── 📁 components/
                ├── Navbar.jsx
                ├── Hero.jsx
                ├── ProductList.jsx
                ├── ProductCard.jsx
                ├── Cart.jsx
                ├── CheckoutForm.jsx
                └── Footer.jsx
```

---

## 🧪 Lab Sheets

| Lab # | File | Description |
|---|---|---|
| Lab 3 | [labsheet_3_Akshit_Negi_CU24250214.pdf](labsheet_3_Akshit_Negi_CU24250214.pdf) | Lab Sheet 3 Solution |
| Lab 4 | [LAB SHEET 4.pdf](<LAB SHEET 4.pdf>) | Lab Sheet 4 – Full Stack |
| Lab 5 | [Full Stack lab sheet 5_Akshit_Negi.pdf](<Full Stack lab sheet 5_Akshit_Negi.pdf>) | Lab Sheet 5 – Full Stack |
| Lab 6 | [LabSheet-6 Full Stack.pdf.pdf](<LabSheet-6 Full Stack.pdf.pdf>) | Lab Sheet 6 – Full Stack |
| Lab 7 | [Labsheet 7_Solution_.pdf](<Labsheet 7_Solution_.pdf>) | Lab Sheet 7 – Solution |

---

## 📋 Assignments

| Assignment | File | Type |
|---|---|---|
| AS01 | [BTCS303P-AS01-Solution.pdf](BTCS303P-AS01-Solution.pdf) | Practical Solution (PDF) |
| AS02 | [BTCS303P-AS02-Solution.pdf](BTCS303P-AS02-Solution.pdf) | Practical Solution (PDF) |
| Project | [assignment/techstore-frontend](assignment/techstore-frontend/) | TechStore – Vanilla JS |
| Project | [assignment/techstore-react](assignment/techstore-react/) | TechStore – React + Vite |

---

## 📦 Other Resources

| File | Description |
|---|---|
| [SQL_Practice_Sheet.pdf](SQL_Practice_Sheet.pdf) | SQL Practice Questions & Exercises |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/) or any editor

### Clone the Repository

```bash
git clone https://github.com/cu24250214-dotcom/Full_stack_BTCS303P.git
cd Full_stack_BTCS303P
```

### Run the Vanilla JS TechStore

```bash
# Just open in browser — no build step needed
cd assignment/techstore-frontend
# Open index.html in your browser
```

### Run the React + Vite TechStore

```bash
cd assignment/techstore-react
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 👤 Author

**Akshit Negi**  
🎓 Enrollment No.: `CU24250214`  
🏫 COER University  
🔗 GitHub: [@cu24250214-dotcom](https://github.com/cu24250214-dotcom)

---

> 📝 *This repository is maintained for academic purposes as part of the BTCS303P Full Stack Development Lab course.*
