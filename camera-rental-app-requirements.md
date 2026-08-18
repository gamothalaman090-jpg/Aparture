# Camera Rental E-Commerce Platform — Requirements Specification

**Project type:** School/class project
**Prepared as:** Software Requirements Specification (SRS)

---

## 1. Project Overview

**Purpose:** A web application that lets customers browse, book, and pay a deposit on rental cameras and gear, while admins manage inventory, pricing, and orders.

**Users:**
- **Customer** — browses catalog, books rentals, manages their orders/profile
- **Admin** — manages inventory, approves/tracks rentals, views reports

**Tech stack (recommended):**
| Layer | Choice | Why |
|---|---|---|
| Frontend | React (Vite), React Router, Context API or Redux Toolkit | Matches your requirement to use React |
| Styling | Tailwind CSS | Fast, consistent, easy to justify in a report |
| Backend | Node.js + Express | Pairs naturally with JS frontend, one language end-to-end |
| Database | MongoDB (Mongoose) | Faster to prototype, flexible schema for camera specs |
| Auth | JWT (access token) + bcrypt for password hashing | Standard, easy to explain in defense |
| Payments | Mock checkout (no real gateway) | Per your requirement |

**Decided: MongoDB.** Schema in Section 5 is written as Mongoose-style documents accordingly.

---

## 2. Actors & Roles

| Role | Description |
|---|---|
| Guest | Unauthenticated visitor — can browse catalog, cannot book |
| Customer | Registered user — can book, pay deposit, view rental history, cancel/return |
| Admin | Manages camera inventory, categories, pricing, views/approves orders, marks equipment returned/damaged |

---

## 3. Functional Requirements

### 3.1 Customer-facing
- FR1: Register/login (email + password, JWT session)
- FR2: Browse camera catalog with filters (category, brand, price range, availability dates)
- FR3: View camera detail page (specs, images, daily rate, deposit amount, availability calendar)
- FR4: Add to cart / rental basket with selected rental date range
- FR5: Checkout — review order summary (daily rate × days + deposit), mock payment, confirm booking
- FR6: View order history and current rental status (Reserved, Ongoing, Returned, Overdue, Cancelled)
- FR7: Cancel a reservation before rental start date
- FR8: Leave a review/rating for a camera after return (only if that camera was actually rented by the user)

### 3.2 Admin-facing
- FR9: CRUD for camera items (name, brand, category, specs, images, daily rate, deposit, stock quantity, condition)
- FR10: CRUD for categories/brands
- FR11: View all orders, filter by status
- FR12: Update order status (approve, mark as picked up, mark as returned, mark as damaged/late)
- FR13: Auto-block a camera's dates once booked (prevent double-booking)
- FR14: Dashboard summary (active rentals, overdue rentals, revenue this month, most-rented items)

### 3.3 System
- FR15: Availability engine — a camera can only be booked if it's not already reserved for the overlapping date range
- FR16: Deposit/damage fee logic — deposit held on booking, refunded on return unless marked damaged
- FR17: Late return calculation — automatic late fee if returned after due date
- FR18: Rental duration constraint — minimum 1 day, maximum 14 days per booking (prevents indefinite holds on limited stock; 14 days is enough to cover typical shoot/event/travel use cases without a single booking locking a camera for months)

---

## 4. Non-Functional Requirements

- NFR1: Responsive UI (mobile + desktop)
- NFR2: Passwords hashed, JWT expiry, protected admin routes (role-based access control)
- NFR3: Input validation on both frontend and backend
- NFR4: Codebase must demonstrate OOP (classes/inheritance) and array operations (map/filter/reduce/sort) — see Section 6
- NFR5: Basic error handling + user-facing error states (out of stock, invalid dates, etc.)

---

## 5. Core Entities / Database Schema

```
User
 - _id, name, email, passwordHash, role [customer|admin], createdAt

Category
 - _id, name, description

Camera
 - _id, name, brand, categoryId (ref Category), description, specs {},
   imageUrls: [String], dailyRate, depositAmount, stockQuantity,
   condition [new|good|fair], isActive,
   bookedRanges: [{ startDate, endDate, bookingId }]  // denormalized for fast availability checks

Booking
 - _id, userId (ref User), cameraId (ref Camera), startDate, endDate,
   status [pending|confirmed|ongoing|returned|overdue|cancelled|damaged],
   dailyRateSnapshot, depositAmount, totalPrice, lateFee, createdAt

Review
 - _id, userId (ref User), cameraId (ref Camera), bookingId (ref Booking),
   rating, comment, createdAt
```

**Relationships:** referenced via ObjectId (Mongoose `ref`) rather than SQL foreign keys. The `bookedRanges` array on `Camera` is the key structure for FR15 — before confirming a booking, run an overlap check (`.some()`) against it; on confirm, push the new range.

**Review integrity (FR8):** before allowing a review, check the user has a `Booking` with `status: "returned"` for that `cameraId` — enforced in the service layer, not just the UI.

---

## 6. Where OOP and Arrays Come In (since your course requires them)

This matters for your report/defense, so being explicit:

**OOP (backend, class-based):**
- Abstract/base `RentableItem` class → `Camera` extends it (shows inheritance)
- `Booking` class encapsulates pricing logic as methods: `calculateTotal()`, `calculateLateFee()`, `applyDamageCharge()`
- `User` base class → `Admin` and `Customer` subclasses with different permissions (polymorphism: `getDashboard()` behaves differently per role)
- Repository/Service classes (`CameraService`, `BookingService`) encapsulating business logic separate from route handlers — demonstrates encapsulation and separation of concerns

**Arrays (frontend + backend):**
- Catalog filtering: `.filter()` by category/brand/price/date availability
- Cart/basket: array of booking line items, `.reduce()` to calculate cart total
- Admin dashboard: `.sort()` by revenue/popularity, `.map()` to render tables
- Availability check: array of existing bookings for a camera, `.some()`/`.filter()` to detect date overlap

I can generate a short "OOP & Array Design Notes" appendix mapping each requirement to the exact class/array method used — professors like seeing this explicitly tied to requirements. Want that as a separate section?

---

## 7. Screens / Pages

**Customer:** Home/Catalog, Camera Detail, Cart, Checkout, Order History, Login/Register, Profile
**Admin:** Dashboard, Inventory Management, Category Management, Orders Management, Reports

---

## 8. Suggested Build Order

1. Data models + auth (register/login, JWT, roles)
2. Camera catalog CRUD (admin) + browse/filter (customer)
3. Availability engine + booking flow + mock checkout
4. Order/booking status lifecycle (admin actions: approve, return, damage, late fee)
5. Dashboard + reports
6. Polish: reviews, responsive design, error states

---

## Decisions Log

| Decision | Choice |
|---|---|
| Database | MongoDB (Mongoose) |
| Double-booking prevention | Required in v1 (FR15, backed by `Camera.bookedRanges`) |
| Reviews/Ratings | In scope (FR8), gated to users who actually completed a rental |
| Rental duration limits | Min 1 day, max 14 days (FR18) |
