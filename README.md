# StepAngularProject

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# Step Tech 🛒

A full-featured e-commerce web application built with **Angular 17+** consuming the **Step Academy Shop API**. Features a dark futuristic UI with orange accent (`#FF6B00`), JWT authentication, product browsing, cart, wishlist, reviews, and an admin panel.

---

## 🚀 Tech Stack

- **Framework**: Angular 17+ (Standalone Components)
- **Styling**: SCSS
- **HTTP**: Angular HttpClient
- **Authentication**: JWT (Bearer Token)
- **API**: Step Academy Shop API (`https://shopapi.stepacademy.ge/api/`)

---

## 📁 Project Structure

```
src/app/
├── services/
│   ├── api.ts                # All HTTP requests
│   ├── auth-service.ts       # Auth state (isLoggedIn, isAdmin)
│   ├── toast.ts              # Toast notification service
│   └── cart-count-service.ts # Cart & wishlist count state
├── header/                   # Global header with filter bar
├── footer/                   # Global footer
├── toast/                    # Toast notification component
├── home/                     # Home page
├── products/                 # Products listing with filters
├── details/                  # Product detail page with reviews
├── cart/                     # Shopping cart
├── wishlist/                 # Wishlist page
├── login/                    # Login page
├── register/                 # Register page
├── verify/                   # Email verification page
├── forgotpassword/           # Forgot password page
├── resetpassword/            # Reset password page
├── myaccount/                # My Account (profile, password, admin panel)
└── error/                    # 404 page
```

---

## ✨ Features

### 🔐 Authentication
- Register with email verification flow
- Login with JWT token storage
- Forgot password & reset password
- Resend verification code (30s cooldown)
- Auto-logout on token expiry

### 🛍️ Products
- Browse all products with infinite filters:
  - Search by name/brand
  - Filter by Category, Brand, Price range
  - Filter by Rating, In Stock
  - Sort by Price / Name / Rating (asc/desc)
- Product detail page with image, specs, stock info
- Star rating & reviews system

### 🛒 Cart
- Add/remove products
- Edit quantity
- Real-time total calculation
- Proceed to checkout
- Clear all

### ❤️ Wishlist
- Add/remove from wishlist
- Heart icon turns orange when product is in wishlist
- Add to cart directly from wishlist
- Clear all

### 👤 My Account
- View & edit profile info
- Change password
- Delete account
- Real-time cart & wishlist counts in header

### 🔔 Notifications
- Toast notifications for all actions (success / error / warning)

### 🛡️ Admin Panel *(requires Admin role)*
- Add Product
- Add Category
- Manage Products (Edit / Delete)
- Manage Categories (Edit / Delete)

---

## 🔑 API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register |
| PUT | `/auth/verify-email` | Verify email |
| POST | `/auth/login` | Login |
| POST | `/auth/forget-password/{email}` | Forgot password |
| PUT | `/auth/reset-password` | Reset password |
| POST | `/auth/resend-email-verification/{email}` | Resend code |
| GET | `/users/me` | Get current user |
| PUT | `/users` | Update profile |
| PUT | `/users/change-password` | Change password |
| DELETE | `/users/delete-profile` | Delete account |
| POST | `/users/checkout` | Checkout |
| GET | `/products` | Get products |
| GET | `/products/filter` | Filter products |
| GET | `/products/{id}` | Get product by ID |
| POST | `/products` | Add product *(Admin)* |
| PUT | `/products/{id}` | Update product *(Admin)* |
| DELETE | `/products/{id}` | Delete product *(Admin)* |
| GET | `/categories` | Get categories |
| POST | `/categories` | Add category *(Admin)* |
| PUT | `/categories/{id}` | Update category *(Admin)* |
| DELETE | `/categories/{id}` | Delete category *(Admin)* |
| GET | `/cart` | Get cart |
| POST | `/cart/add-to-cart` | Add to cart |
| PUT | `/cart/edit-quantity` | Edit quantity |
| DELETE | `/cart/remove-from-cart/{id}` | Remove from cart |
| GET | `/favorites` | Get wishlist |
| POST | `/favorites/{productId}` | Add to wishlist |
| DELETE | `/favorites/{productId}` | Remove from wishlist |
| GET | `/reviews/{productId}` | Get reviews |
| POST | `/reviews` | Add review |
| PUT | `/reviews` | Update review |
| DELETE | `/reviews/{id}` | Delete review |

---

## ⚙️ Setup & Installation

```bash
# Clone the repository
git clone <repo-url>
cd step-tech

# Install dependencies
npm install

# Run development server
ng serve

# Open in browser
http://localhost:4200
```

---

## 🔧 Configuration

API key and base URL are configured in `src/app/services/api.ts`:

```typescript
private baseUrl = 'https://shopapi.stepacademy.ge/api/';
private authKey = 'your-api-key-here';
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Accent | `#FF6B00` |
| Background | `#0a0a0f` |
| Card BG | `#111118` |
| Text | `#e8e8f0` |
| Muted | `#5a5a7a` |
| Border | `rgba(255, 107, 0, 0.15)` |
| Font | Rajdhani, Segoe UI |

---

## 📝 Notes

- Admin panel is visible only when `role === 'Admin'` is stored in `localStorage`
- Token is stored in `localStorage` as `token`
- Cart and wishlist counts update in real-time without page refresh
- All protected routes require a valid JWT token

---

*Built by Irakli Bibilashvili — Step Academy 2026*