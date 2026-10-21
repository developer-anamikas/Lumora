# Lumora Skincare

Lumora is a minimalist skincare e-commerce web application built with React and Vite. It offers an elegant shopping experience featuring product categories, featured essentials, dynamic product detail routing, price-range filtering, customer testimonials, and an interactive shopping cart with local storage persistence.

## Tech Stack

- **React 19** - UI Components & State Management
- **React Router 7** - Client-Side Routing
- **Vite 8** - Fast Build Tool & Dev Server
- **Vanilla CSS** - Custom Modern Responsive Styling
- **ESLint** - Code Quality & Linting

## Key Features

- **Home Experience**: Hero showcase, category discovery, featured bestsellers with quick add-to-cart stepper, and customer testimonials.
- **Product Catalog (/shop)**: Categorized product catalog (Cleansers, Serums, Moisturizers, Sunscreens, Lip Care, Face Wash) with real-time min/max price range filtering and slider.
- **Product Details (/product/:productName)**: Dedicated product view with dynamic URL decoding, detailed descriptions, ratings, and quantity controls.
- **Shopping Cart (/cart)**: Full shopping bag table with thumbnail previews, item quantity increment/decrement, line-item removal, real-time subtotal/order calculations, and cross-tab/local storage synchronization.
- **Responsive Layout**: Fluid mobile, tablet, and desktop layout with accessible navigation.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Project Structure

```text
lumora-skincare/
├── public/
│   └── favicon.svg           # Website tab icon
├── src/
│   ├── assets/
│   │   └── lumora-hero.png   # Hero banner image
│   ├── data/
│   │   └── products.js       # Product catalog dataset
│   ├── pages/
│   │   ├── Cart.css          # Shopping cart styles
│   │   ├── Cart.jsx          # Shopping cart page component
│   │   ├── ProductDetails.css# Product details styles
│   │   ├── ProductDetails.jsx# Product details page component
│   │   ├── Shop.css          # Shop catalog styles
│   │   └── Shop.jsx          # Shop catalog page component
│   ├── utils/
│   │   └── cartUtils.js      # Cart localStorage helper functions
│   ├── App.css               # Main app & home page styles
│   ├── App.jsx               # Main layout and route configuration
│   ├── index.css             # Global CSS reset & base styles
│   └── main.jsx              # Application entry point
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── package.json              # Project dependencies & scripts
├── README.md                 # Project documentation
└── vite.config.js            # Vite configuration
```


