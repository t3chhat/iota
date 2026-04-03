# IOTA - Vintage Clothing E-Commerce Platform
## Product Requirements Document (PRD)

---

## Overview
IOTA is a full-stack vintage clothing e-commerce web application built with Node.js, Express, EJS, and MariaDB. It serves two audiences: customers browsing/purchasing products, and admins managing inventory and orders.

- **URL**: http://localhost:3030
- **Start command**: `npm start`
- **Database**: MariaDB at eagle.cdm.depaul.edu

---

## Features & Status

### 1. App Startup & Core Infrastructure

| # | Requirement | Status | Issue |
|---|------------|--------|-------|
| 1.1 | App starts without crashing | BROKEN | `app.js:23` — `res` is undefined in DB error handler; app crashes if DB is unreachable |
| 1.2 | Session management | BROKEN | Missing `resave` and `saveUninitialized` options causes deprecation warnings |
| 1.3 | Database connection | WORKING | Connects to MariaDB (requires DePaul network/VPN) |

---

### 2. Home Page (`/`)

| # | Requirement | Status | Issue |
|---|------------|--------|-------|
| 2.1 | Display featured products (homepage=1) | WORKING | — |
| 2.2 | Display active promotions by date range | WORKING | — |
| 2.3 | Link to individual product details | WORKING | — |

---

### 3. Product Catalog (`/catalog`)

| # | Requirement | Status | Issue |
|---|------------|--------|-------|
| 3.1 | Browse all products | WORKING | — |
| 3.2 | Add items to cart | WORKING | — |
| 3.3 | View cart contents | BROKEN | SQL injection in cart query (`catalog.js:53`) — string concatenation with session data |
| 3.4 | Remove items from cart | WORKING | — |
| 3.5 | Cart displays product details and totals | BROKEN | Missing quotes on HTML `value` attributes (`catalog.ejs:5`, `cart.ejs:28`) |

---

### 4. Search (`/search`)

| # | Requirement | Status | Issue |
|---|------------|--------|-------|
| 4.1 | Search products by name/description | BROKEN | SQL injection — `search.js:5` uses string concatenation with user input |
| 4.2 | Display search results with images | BROKEN | `search.ejs:8` shows raw filename text instead of `<img>` tag |

---

### 5. Customer Registration & Login (`/customer`)

| # | Requirement | Status | Issue |
|---|------------|--------|-------|
| 5.1 | Register new customer | BROKEN | Duplicate `POST /` routes (`customer.js:188` and `207`) — second overwrites first |
| 5.2 | Hash passwords on registration | BROKEN | Due to duplicate route, the working bcrypt version may be overwritten |
| 5.3 | Login with username/password | BROKEN | SQL injection in login query (`customer.js:104`) — unescaped username |
| 5.4 | Set session on login | BROKEN | Sets `req.session.customer_id` (`customer.js:116`) but checkout checks `req.session.user_id` (`customer.js:138`) |
| 5.5 | Logout and clear session | WORKING | — |

---

### 6. Checkout (`/customer/checkout`)

| # | Requirement | Status | Issue |
|---|------------|--------|-------|
| 6.1 | Create order from cart | BROKEN | Session variable mismatch — checks `user_id` but login sets `customer_id` |
| 6.2 | Create order items from cart | BROKEN | SQL injection in price subquery (`customer.js:152`); references `saleprice` column that may not exist |
| 6.3 | Display confirmation with order number | WORKING (if reached) | — |

---

### 7. Product Management (`/product`) — Admin CRUD

| # | Requirement | Status | Issue |
|---|------------|--------|-------|
| 7.1 | List all products | WORKING | — |
| 7.2 | View single product | BROKEN | SQL injection (`product.js:25`) |
| 7.3 | Add new product form | BROKEN | Duplicate route (`product.js:41` and `49`) — second overwrites first; typo `es.render` (`product.js:55`) |
| 7.4 | Save new product | WORKING | Uses parameterized query |
| 7.5 | Edit product form | BROKEN | SQL injection (`product.js:97`); `editrec.ejs:9` uses `onerec.text` instead of `onerec.size` |
| 7.6 | Save edited product | BROKEN | SQL injection (`product.js:115`) |
| 7.7 | Delete product | BROKEN | SQL injection (`product.js:145`) |

---

### 8. Customer Management (`/customer`) — Admin CRUD

| # | Requirement | Status | Issue |
|---|------------|--------|-------|
| 8.1 | List all customers | BROKEN | Exposes passwords, card numbers, CVVs in plain text |
| 8.2 | View single customer | BROKEN | SQL injection (`customer.js:73`); exposes sensitive data; typo "Cary Expiry" in `onerec.ejs:19` |
| 8.3 | Make/remove admin | BROKEN | SQL injection (`customer.js:36,54`); renders `customer/` directory instead of template (`customer.js:44,62`) |
| 8.4 | Edit customer | BROKEN | SQL injection (`customer.js:247`); saves password as plain text (no bcrypt) |
| 8.5 | Delete customer | BROKEN | SQL injection (`customer.js:265`) |

---

### 9. Brand Management (`/brand`) — Admin CRUD

| # | Requirement | Status | Issue |
|---|------------|--------|-------|
| 9.1 | List all brands | WORKING | — |
| 9.2 | View single brand | BROKEN | SQL injection (`brand.js:25`) |
| 9.3 | Add new brand | BROKEN | `addrec.ejs` form closes before submit button — button is outside `<form>` |
| 9.4 | Save new brand | WORKING | Uses parameterized query |
| 9.5 | Edit brand | BROKEN | SQL injection (`brand.js:67`) |
| 9.6 | Save edited brand | BROKEN | SQL injection (`brand.js:85`) |
| 9.7 | Delete brand | BROKEN | SQL injection (`brand.js:103`) |

---

### 10. Category Management (`/category`) — Admin CRUD

| # | Requirement | Status | Issue |
|---|------------|--------|-------|
| 10.1 | List all categories | WORKING | — |
| 10.2 | View single category | BROKEN | SQL injection (`category.js:25`) |
| 10.3 | Add new category | BROKEN | `addrec.ejs` form closes before submit button — button is outside `<form>` |
| 10.4 | Save new category | WORKING | Uses parameterized query |
| 10.5 | Edit category | BROKEN | SQL injection (`category.js:67`) |
| 10.6 | Save edited category | BROKEN | SQL injection (`category.js:85`) |
| 10.7 | Delete category | BROKEN | SQL injection (`category.js:103`) |

---

### 11. Order Management (`/order_detail`) — Admin CRUD

| # | Requirement | Status | Issue |
|---|------------|--------|-------|
| 11.1 | List all orders | WORKING | — |
| 11.2 | View single order | BROKEN | SQL injection (`order_detail.js:25`) |
| 11.3 | Add new order | BROKEN | `addrec.ejs` form closes before submit button |
| 11.4 | Save new order | WORKING | Uses parameterized query |
| 11.5 | Edit order | BROKEN | SQL injection (`order_detail.js:67`) |
| 11.6 | Save edited order | BROKEN | SQL injection (`order_detail.js:85`) |
| 11.7 | Delete order | BROKEN | SQL injection (`order_detail.js:103`) |

---

### 12. Order Items Management (`/order_items`) — Admin CRUD

| # | Requirement | Status | Issue |
|---|------------|--------|-------|
| 12.1 | List all order items | WORKING | — |
| 12.2 | View single order item | BROKEN | SQL injection (`order_items.js:25`) |
| 12.3 | Add new order item | BROKEN | `addrec.ejs` has wrong field name — `order_date` should be `product_id`; form closes before button |
| 12.4 | Save new order item | WORKING | Uses parameterized query |
| 12.5 | Edit order item | BROKEN | SQL injection (`order_items.js:67`); `editrec.ejs` uses invalid `type="price"` |
| 12.6 | Save edited order item | BROKEN | SQL injection (`order_items.js:85`) |
| 12.7 | Delete order item | BROKEN | SQL injection (`order_items.js:103`) |

---

### 13. Promotion Management (`/promotion`) — Admin CRUD

| # | Requirement | Status | Issue |
|---|------------|--------|-------|
| 13.1 | List all promotions | WORKING | — |
| 13.2 | View single promotion | BROKEN | SQL injection (`promotion.js:25`) |
| 13.3 | Add new promotion | BROKEN | `addrec.ejs` form closes before submit button |
| 13.4 | Save new promotion | WORKING | Uses parameterized query |
| 13.5 | Edit promotion | BROKEN | SQL injection (`promotion.js:67`) |
| 13.6 | Save edited promotion | BROKEN | SQL injection (`promotion.js:85`) |
| 13.7 | Delete promotion | BROKEN | SQL injection (`promotion.js:103`) |

---

### 14. Reports (`/report`)

| # | Requirement | Status | Issue |
|---|------------|--------|-------|
| 14.1 | Report menu page | WORKING | — |
| 14.2 | Customer report | BROKEN | Exposes passwords and card data (`report.js:16`); duplicate "Address Line 1" header |
| 14.3 | Product report | WORKING | — |
| 14.4 | Sales report | BROKEN | Template expects `saleprice` but table column is `price` |

---

### 15. Static Info Pages

| # | Requirement | Status | Issue |
|---|------------|--------|-------|
| 15.1 | About page | WORKING | — |
| 15.2 | Contact page | WORKING | — |
| 15.3 | Help/FAQ page | WORKING | References `/javascripts/help.js` which may not exist |
| 15.4 | Privacy page | WORKING | — |

---

## Bug Summary

### Critical (App crashes or security vulnerability)
1. **App crash on DB failure** — `app.js:23` references undefined `res`
2. **SQL injection in login** — `customer.js:104` allows authentication bypass
3. **SQL injection in search** — `search.js:5` unescaped user input
4. **28+ SQL injection points** across all CRUD routes using string concatenation
5. **Sensitive data exposure** — passwords, card numbers, CVVs displayed in customer views and reports

### High (Feature doesn't work)
6. **Duplicate routes** — `customer.js` has two `POST /` (lines 188, 207); `product.js` has two `GET /addrecord` (lines 41, 49)
7. **Session mismatch** — login sets `customer_id`, checkout checks `user_id`
8. **Broken form submissions** — brand, category, order_detail, promotion `addrec.ejs` forms close before submit button
9. **Wrong field name** — `order_items/addrec.ejs` uses `order_date` instead of `product_id`
10. **Typo crashes** — `product.js:55` has `es.render` instead of `res.render`
11. **Wrong variable** — `product/editrec.ejs:9` uses `onerec.text` instead of `onerec.size`
12. **Invalid renders** — `customer.js:44,62` renders `customer/` (a directory)

### Medium (Visual/UX bugs)
13. **Search results** — shows raw image filename instead of image
14. **Missing HTML quotes** — `catalog.ejs:5`, `cart.ejs:28`
15. **Invalid HTML type** — `order_items/editrec.ejs` uses `type="price"`
16. **Typo** — `customer/onerec.ejs:19` says "Cary Expiry" instead of "Card Expiry"
17. **Duplicate headers** — customer list and report show "Address Line 1" twice
18. **Session warnings** — missing `resave` and `saveUninitialized` options
19. **Sales report field mismatch** — template expects `saleprice`, DB has `price`

### Low (Code quality)
20. **Password not hashed on edit** — `customer.js:247` saves plain text password
21. **No auth middleware** — admin routes accessible without login
22. **Weak session secret** — hardcoded as `'iota'`
23. **Global db variable** — anti-pattern, should use module exports

---

## Database Schema (Inferred)

| Table | Columns |
|-------|---------|
| product | id, product_name, prod_image, description, price, size, color, brand_id, category_id, sold, homepage |
| customer | id, first_name, middle_name, last_name, email_address, phone_number, username, password, address_line1, address_line2, city, state, zip_code, country, payment_method, card_number, card_expiry, card_cvv, isadmin |
| order_detail | id, user_id, order_date, total_amount, order_status |
| order_items | id, order_id, product_id, price, quantity |
| category | id, category_name |
| brand | id, brand_name |
| promotion | id, promo_title, promo_image, description, start_date, end_date, discount_rate |

---

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js 4.19.2
- **Templating**: EJS with express-ejs-layouts
- **Database**: MariaDB 3.3.1 (callback API)
- **Auth**: bcryptjs for password hashing
- **Sessions**: express-session
