# APERTURE — Camera Rental E-Commerce Platform

A production-grade, full-stack e-commerce web application for renting high-end cinema cameras, anamorphic prime lenses, wireless follow focus units, aerial drones, and stabilizer rigs. Built with a high-end industrial dark glass aesthetic, zero-latency custom cursor tracking, Web Audio API sound synthesis, and Object-Oriented Programming (OOP) domain business logic.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB Atlas** (or local MongoDB server)

### 1. Installation

Install dependencies in both client and server:

```bash
# Install root & workspace dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Configuration

Create a `.env` file inside the `server/` directory (or copy from `.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/camera_rental_db
JWT_SECRET=camera_rental_super_secret_jwt_key_2026
NODE_ENV=development
```

### 3. Database Seeding

Populate MongoDB Atlas with demo users, camera fleet, categories, sample bookings, and verified reviews:

```bash
cd server
npm run seed
```

### 4. Running the Development Servers

Start the backend API server:
```bash
cd server
npm run dev
```

In a separate terminal, start the Vite React frontend:
```bash
cd client
npm run dev
```

Open your browser to `http://localhost:3000`.

---

## 🔑 Demo Access Credentials

| User Role | Email Address | Password | Permissions & Capabilities |
|---|---|---|---|
| **Customer** | `alex@creatives.com` | `customer123` | Browse catalog, inspect camera specs, select rental date range, checkout flight case, view order history, submit verified reviews |
| **Admin** | `admin@aperture.com` | `admin123` | Full Studio Command Center (`/admin`), gross revenue metrics, inventory CRUD (`/admin/inventory`), order lifecycle transitions (`/admin/orders`), damage/late fee assessment, category manager (`/admin/categories`) |

---

## 🧠 Object-Oriented Programming (OOP) Architecture & Product Page Engine

The application enforces strict Object-Oriented Programming (OOP) principles and functional modularity across both the backend (`server/domain/`) and frontend (`client/src/domain/`), ensuring clean separation of concerns, code reusability, polymorphic capabilities, and domain encapsulation.

```
server/domain/
├── RentableItem.js        # Backend Base Abstract Class (Inheritance)
├── CameraDomain.js        # Backend Subclass extending RentableItem (Inheritance & Encapsulation)
├── UserDomain.js          # User Abstract Base & Derived Classes (Polymorphism)
└── BookingCalculator.js   # Server Pricing & Fee Calculation Engine (Encapsulation)

client/src/domain/
├── RentableItem.js        # Frontend Abstract Base Model Class (Inheritance)
├── CameraItem.js          # Subclass extending RentableItem (Inheritance & FR15 Availability)
├── LensItem.js            # Subclass extending RentableItem (Inheritance & Optics Specs)
└── RentalCalculator.js    # Client-Side Pricing & Duration Validation Engine (FR18 Limits)

client/src/services/
└── productService.js     # Factory functions (createRentableItem) & API/fallback product loaders
```

---

### 1. Inheritance (Abstract Base & Subclasses)

#### Abstract Base Class: `RentableItem`
Located at [`server/domain/RentableItem.js`](file:///d:/Projects/Ecommerce/server/domain/RentableItem.js).

`RentableItem` is an abstract base class defining common attributes (`id`, `name`, `dailyRate`, `depositAmount`, `isActive`) and foundational methods shared by all rental inventory types. Direct instantiation is guarded against runtime errors.

```javascript
export class RentableItem {
  constructor({ id, name, dailyRate, depositAmount, isActive = true }) {
    if (new.target === RentableItem) {
      throw new Error("Cannot instantiate abstract class RentableItem directly.");
    }
    this.id = id;
    this.name = name;
    this.dailyRate = dailyRate;
    this.depositAmount = depositAmount;
    this.isActive = isActive;
  }

  calculateBaseRentalFee(durationDays) {
    if (durationDays < 1) throw new Error("Rental duration must be at least 1 day.");
    return this.dailyRate * durationDays;
  }

  getDeposit() {
    return this.depositAmount;
  }
}
```

#### Derived Subclass: `CameraDomain`
Located at [`server/domain/CameraDomain.js`](file:///d:/Projects/Ecommerce/server/domain/CameraDomain.js).

`CameraDomain` extends `RentableItem` using the `super()` keyword, inheriting `dailyRate` and `depositAmount` while adding camera-specific properties (`brand`, `category`, `specs`, `stockQuantity`, `bookedRanges`).

```javascript
import { RentableItem } from './RentableItem.js';

export class CameraDomain extends RentableItem {
  constructor({ id, name, brand, category, description, specs, dailyRate, depositAmount, stockQuantity, bookedRanges }) {
    // Invoke base class constructor via super()
    super({ id, name, dailyRate, depositAmount, isActive });
    
    this.brand = brand;
    this.category = category;
    this.description = description;
    this.specs = specs;
    this.stockQuantity = stockQuantity;
    this.bookedRanges = bookedRanges;
  }
}
```

---

### 2. Encapsulation (Business Logic & Availability Engine)

Encapsulation hides complex implementation details inside class methods, exposing clean interfaces to services and controllers.

#### A. Double-Booking Overlap Prevention Engine (`CameraDomain`)
The method `isAvailableForRange()` encapsulates the double-booking overlap detection algorithm. It uses the JavaScript array `.some()` method to check if a requested date range `[reqStart, reqEnd]` overlaps with any confirmed reservation `[existingStart, existingEnd]`:

$$\text{Overlap Condition} \iff (\text{reqStart} \le \text{existingEnd}) \land (\text{reqEnd} \ge \text{existingStart})$$

```javascript
// Located in CameraDomain.js
isAvailableForRange(requestedStart, requestedEnd) {
  if (!this.isActive || this.stockQuantity < 1) return false;

  const reqStart = new Date(requestedStart).getTime();
  const reqEnd = new Date(requestedEnd).getTime();

  // Encapsulated array .some() overlap validation
  const hasOverlap = this.bookedRanges.some(range => {
    const existingStart = new Date(range.startDate).getTime();
    const existingEnd = new Date(range.endDate).getTime();
    return (reqStart <= existingEnd && reqEnd >= existingStart);
  });

  return !hasOverlap;
}
```

#### B. Financial & Fee Calculation Engine (`BookingCalculator`)
Located at [`server/domain/BookingCalculator.js`](file:///d:/Projects/Ecommerce/server/domain/BookingCalculator.js).

`BookingCalculator` encapsulates static methods for computing rental days, daily subtotals, security deposit holds, 1.5x late fees, and damage deductions:

```javascript
export class BookingCalculator {
  static MIN_RENTAL_DAYS = 1;
  static MAX_RENTAL_DAYS = 14;
  static LATE_FEE_MULTIPLIER = 1.5; // 1.5x daily rate penalty

  static calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
    const duration = diffDays === 0 ? 1 : diffDays;

    if (duration > this.MAX_RENTAL_DAYS) {
      throw new Error(`Maximum rental duration is ${this.MAX_RENTAL_DAYS} days per booking.`);
    }
    return duration;
  }

  static calculatePricing({ dailyRate, depositAmount, startDate, endDate }) {
    const durationDays = this.calculateDuration(startDate, endDate);
    const rentalFee = dailyRate * durationDays;
    const totalPrice = rentalFee + depositAmount;

    return { durationDays, rentalFee, depositAmount, totalPrice };
  }
}
```

---

### 3. Polymorphism (Role-Based Permissions Matrix)

Located at [`server/domain/UserDomain.js`](file:///d:/Projects/Ecommerce/server/domain/UserDomain.js).

Polymorphism allows `CustomerUser` and `AdminUser` to inherit from the base `UserDomain` class and override the `getPermissions()` and `getDashboardTitle()` methods to return role-specific permissions dynamically.

```javascript
// Base UserDomain Abstract Class
export class UserDomain {
  constructor({ id, name, email, role }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  // Polymorphic method overriden by subclasses
  getPermissions() {
    return [];
  }
}

// Subclass 1: CustomerUser
export class CustomerUser extends UserDomain {
  getPermissions() {
    return ['browse_catalog', 'create_booking', 'view_own_orders', 'cancel_own_booking', 'submit_review'];
  }
  getDashboardTitle() { return "Customer Rental History & Account"; }
}

// Subclass 2: AdminUser
export class AdminUser extends UserDomain {
  getPermissions() {
    return [
      'browse_catalog', 'create_booking', 'view_own_orders', 'cancel_own_booking', 'submit_review',
      'manage_inventory', 'manage_categories', 'manage_orders', 'update_order_status', 'view_financial_reports'
    ];
  }
  getDashboardTitle() { return "Admin Command Center"; }
}
```

---

## ⚡ Functional Array Methods & OOP Domain Functions Usage Matrix

| Method / Function | File Location | Code Implementation & Purpose |
|---|---|---|
| **`createRentableItem(data)`** | [`productService.js`](file:///home/ian/Desktop/Work/Aparture/client/src/services/productService.js) | Factory function instantiating the appropriate OOP domain class (`CameraItem`, `LensItem`, etc.) |
| **`fetchProductById(id)`** | [`productService.js`](file:///home/ian/Desktop/Work/Aparture/client/src/services/productService.js) | Product page loader fetching API/mock item JSON and converting into OOP item instances |
| **`isAvailableForRange(start, end)`** | [`CameraItem.js`](file:///home/ian/Desktop/Work/Aparture/client/src/domain/CameraItem.js) | OOP method using `.some()` to detect double-booking overlaps on product pages |
| **`RentalCalculator.calculateDuration()`** | [`RentalCalculator.js`](file:///home/ian/Desktop/Work/Aparture/client/src/domain/RentalCalculator.js) | OOP static method enforcing FR18 rental duration constraints (1 to 14 days) |
| **`calculateBaseRentalFee(days)`** | [`RentableItem.js`](file:///home/ian/Desktop/Work/Aparture/client/src/domain/RentableItem.js) | OOP method computing daily subtotal for selected rental days |
| **`calculateGrandTotal(days)`** | [`RentableItem.js`](file:///home/ian/Desktop/Work/Aparture/client/src/domain/RentableItem.js) | OOP method calculating grand reservation total (rental subtotal + refundable deposit) |
| **`.some()`** | [`CameraDomain.js`](file:///home/ian/Desktop/Work/Aparture/server/domain/CameraDomain.js) | Detect date range overlap between requested rental dates and existing bookings |
| **`.filter()`** | [`CatalogPage.jsx`](file:///home/ian/Desktop/Work/Aparture/client/src/pages/CatalogPage.jsx) | Filter camera catalog by search query, brand, category tab, price slider, and condition |
| **`.reduce()`** | [`CartContext.jsx`](file:///home/ian/Desktop/Work/Aparture/client/src/context/CartContext.jsx) | Compute cart totals for rental fee subtotals, security deposit holds, and grand checkout total |
| **`.map()`** | [`productService.js`](file:///home/ian/Desktop/Work/Aparture/client/src/services/productService.js) | Transform raw API database arrays into OOP `RentableItem` domain model instances |
| **`.sort()`** | [`CatalogPage.jsx`](file:///home/ian/Desktop/Work/Aparture/client/src/pages/CatalogPage.jsx) | Order inventory by daily rate (low to high, high to low), rating, and alphabetical name |

---

## 🗺️ RESTful API Endpoint Map

| HTTP Method | Endpoint | Protection | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Backend health check endpoint |
| `POST` | `/api/auth/register` | Public | Register new customer account |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/auth/profile` | Bearer Token | Retrieve authenticated user profile |
| `GET` | `/api/cameras` | Public | Fetch all active inventory cameras (supports query filters) |
| `GET` | `/api/cameras/:id` | Public | Fetch detailed camera specs and verified reviews |
| `POST` | `/api/cameras` | Admin Only | Register new camera unit into inventory fleet |
| `PUT` | `/api/cameras/:id` | Admin Only | Update camera unit details, rates, or stock |
| `DELETE` | `/api/cameras/:id` | Admin Only | Deactivate camera unit from inventory |
| `GET` | `/api/categories` | Public | List equipment categories |
| `POST` | `/api/bookings` | Bearer Token | Create new equipment reservation |
| `GET` | `/api/bookings/my` | Bearer Token | Fetch customer's own booking history |
| `GET` | `/api/bookings/admin/all` | Admin Only | List all platform bookings for admin management |
| `PUT` | `/api/bookings/:id/cancel` | Bearer Token | Cancel an upcoming booking |
| `PUT` | `/api/bookings/:id/status` | Admin Only | Transition booking status (`Confirmed` &rarr; `Ongoing` &rarr; `Returned`) |
| `POST` | `/api/reviews` | Bearer Token | Submit verified review for returned booking |
| `GET` | `/api/dashboard/stats` | Admin Only | Fetch financial KPI metrics and studio dashboard stats |

---

## 🎨 Design Engineering Highlights

- **Palette**: Dark glass `#050505` with translucent `backdrop-blur-2xl` overlays, cyan glow accents (`#06B6D4`), and amber gold rates (`#F59E0B`).
- **Typography**: Display typography (Outfit/Inter) paired with monospace subheadings (`font-mono`).
- **Micro-Interactions**: Touch `:active { transform: scale(0.97); }` press scale with custom easing `var(--ease-out)` (Emil Kowalski design philosophy).
- **Web Audio API**: Custom audio synthesizer producing mechanical button clicks, dial ticks, and magnetic snap feedback without external dependencies.
