# BURUMAL E-Commerce Frontend

A mobile-first, multi-language e-commerce platform for Burundi, built with React, TypeScript, and Vite.

## Features

- **Multi-language Support**: English, French, and Kirundi
- **Mobile-First Design**: Optimized for low-bandwidth connections
- **Progressive Web App**: Installable on mobile devices
- **Trust-Focused**: Verified sellers, transparent pricing, and reliable delivery
- **Modern Stack**: React 19, TypeScript, Vite, Tailwind CSS, React Router

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Server State**: TanStack Query
- **Routing**: React Router v7
- **Forms**: React Hook Form + Zod
- **Internationalization**: i18next + react-i18next
- **HTTP Client**: Axios
- **PWA**: Service Worker + Web App Manifest

## Project Structure

```
burumal-frontend/
├── src/
│   ├── app/
│   │   ├── router/          # React Router configuration
│   │   ├── providers/       # Context providers
│   │   └── store/           # Zustand stores
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   ├── layout/          # Layout components
│   │   ├── product/         # Product-related components
│   │   ├── seller/          # Seller-related components
│   │   ├── cart/            # Cart components
│   │   ├── checkout/        # Checkout components
│   │   └── order/           # Order components
│   ├── pages/
│   │   ├── Home/            # Homepage
│   │   ├── Product/         # Product details
│   │   ├── Cart/            # Shopping cart
│   │   ├── Checkout/        # Checkout flow
│   │   ├── auth/            # Authentication pages
│   │   ├── seller/          # Seller dashboard
│   │   └── admin/           # Admin dashboard
│   ├── services/
│   │   ├── api/             # API client and endpoints
│   │   └── storage/         # Local storage utilities
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── assets/              # Static assets
│   └── styles/              # Global styles
├── public/                  # Public assets
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd burumal-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_API_BASE_URL=http://localhost:3001/api/v1
VITE_APP_TITLE=BURUMAL
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Language Support

The application supports three languages:
- **English (en)**: Default language
- **French (fr)**: French translation
- **Kirundi (rn)**: Kirundi translation

Language files are located in `src/utils/locales/`

## API Integration

The frontend is designed to work with a NestJS backend. API endpoints are defined in `src/services/api/`:

- `auth.api.ts` - Authentication endpoints
- `products.api.ts` - Product endpoints
- `sellers.api.ts` - Seller endpoints
- `cart.api.ts` - Cart endpoints
- `orders.api.ts` - Order endpoints
- `payments.api.ts` - Payment endpoints
- `delivery.api.ts` - Delivery endpoints

## PWA Support

The application is a Progressive Web App. To enable PWA features:

1. The service worker is registered in `main.tsx`
2. The manifest file is located at `public/manifest.json`
3. Icons should be placed in the `public/` directory

## Mobile-First Approach

The application is designed with mobile as the primary experience:
- Bottom navigation for mobile devices
- Touch-friendly interface
- Optimized images and performance
- Responsive design for all screen sizes

## Key Features

### Customer Experience
- Product browsing and search
- Shopping cart management
- Secure checkout process
- Multiple payment methods (Mobile Money, Bank, BurundiPay, Cash on Delivery)
- Order tracking
- Wishlist management
- User profile management

### Seller Experience
- Product management
- Order management
- Inventory tracking
- Earnings dashboard
- Business analytics

### Admin Experience
- User management
- Seller verification
- Product moderation
- Order management
- Analytics and reports

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

## Support

For support, please contact the development team or open an issue in the repository.

---

Made with ❤️ in Burundi 🇧🇮
