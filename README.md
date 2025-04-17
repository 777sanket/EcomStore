# E-commerce React Application

A fully functional e-commerce web application built with React, JavaScript, and Tailwind CSS using the Platzi Fake API.

## Demo

[Live Demo](https://ecomstore-theta.vercel.app) - Add your deployment URL here

## Features

- **Responsive design** for all devices
- **Product browsing** with category filtering and search
- **Shopping cart** with item management
- **User authentication** with profile management
- **Checkout process** with order confirmation
- **Order history** viewing in user profile
- **Profile management** to update user information

## Tech Stack

- **React** (v18.2.0)
- **React Router DOM** (v6.17.0) for navigation
- **Tailwind CSS** (v3.3.3) for styling
- **Fetch API** for data fetching

## API Integration

This project uses the [Platzi Fake Store API](https://api.escuelajs.co/api/v1/) for:
- Products and categories data
- User authentication and management
- Profile updates

## Project Structure

```
src/
├── api/             # API service layer
├── components/      # React components
│   ├── auth/        # Authentication components
│   ├── cart/        # Cart and checkout components
│   ├── common/      # Shared UI components
│   ├── products/    # Product-related components
│   └── profile/     # User profile components
├── contexts/        # React context for state management
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── utils/           # Utility functions
├── App.jsx          # Main application component
└── index.js         # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/777sanket/EcomStore.git
cd EcomStore.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for Production

```bash
npm run build
```

## Key Components

### Authentication

- **Login/Signup**: User authentication with server-side validation
- **Profile Management**: Update name, email, password, and avatar

### Product Browsing

- **Home Page**: Featured products and categories
- **Product Listing**: Grid view with filtering options
- **Product Details**: Complete product information
- **Search**: Product search functionality

### Shopping Experience

- **Cart Management**: Add, remove, and update quantities
- **Checkout Process**: Shipping information and payment details
- **Order Confirmation**: Summary and confirmation
- **Order History**: View past orders with full details



