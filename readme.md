# RR Bake & Sweet

RR Bake & Sweet is a full-stack bakery web application with a React/Vite storefront and an Express/MongoDB API. It supports customer authentication, product browsing, admin product management, customer listing, and debt/payment tracking for bakery orders.

## Features

- Public bakery pages for home, about, gallery, contact, and products
- Customer registration, login, profile lookup, forgot password, and reset password
- JWT-based authentication with protected admin routes
- Admin product CRUD with categories, availability, featured items, and today's specials
- Admin customer listing
- Admin debt management with payment history, partial payments, paid status, and summary data
- Vite development proxy for frontend-to-backend API calls

## Tech Stack

**Frontend**

- React 18
- Vite
- React Router
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide React

**Backend**

- Node.js
- Express
- MongoDB with Mongoose
- JSON Web Tokens
- bcryptjs
- dotenv
- nodemailer
- multer

## Project Structure

```text
.
+-- bakery-backend/
|   +-- controllers/
|   +-- middleware/
|   +-- models/
|   +-- routes/
|   +-- server.js
|   +-- package.json
+-- bakery-frontend/
    +-- src/
    |   +-- components/
    |   +-- context/
    |   +-- hooks/
    |   +-- pages/
    |   +-- services/
    +-- vite.config.js
    +-- package.json
```

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB running locally or a MongoDB Atlas connection string

## Backend Setup

```bash
cd bakery-backend
npm install
```

Create a `.env` file in `bakery-backend`:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/rr-bake-sweet
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

Start the API:

```bash
npm run dev
```

The backend exposes a health check at:

```text
GET http://localhost:8080/api/health
```

> Note: `server.js` defaults to port `5000`, but `bakery-frontend/vite.config.js` proxies `/api` to `http://localhost:8080`. Use `PORT=8080` in the backend `.env`, or update the Vite proxy target to match your backend port.

## Frontend Setup

```bash
cd bakery-frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

The frontend uses `src/services/api.js`, which sends requests to `/api`. During development, Vite forwards those requests to the backend through the proxy in `vite.config.js`.

## Default Admin

When the backend connects to MongoDB, it seeds a default admin user if one does not already exist:

```text
Email: admin@rrbake.com
Password: admin123
```

Change this password after the first login in any real deployment.

The API also includes `POST /api/auth/create-admin`, guarded by the setup secret `RR-ADMIN-2024` in the current controller code.

## API Overview

### Auth

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/create-admin
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
```

### Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

Product write routes require an authenticated admin token.

### Debts

```text
GET    /api/debts
GET    /api/debts/summary
POST   /api/debts
PUT    /api/debts/:id
POST   /api/debts/:id/payment
PATCH  /api/debts/:id/mark-paid
DELETE /api/debts/:id
```

Debt routes require an authenticated admin token.

### Customers

```text
GET /api/customers
```

Customer listing requires an authenticated admin token.

## Useful Scripts

Run these from the relevant app folder.

### Backend

```bash
npm run dev
npm start
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

## Production Notes

- Set a strong `JWT_SECRET`.
- Do not rely on the seeded default admin credentials in production.
- Configure `CLIENT_URL` to the deployed frontend URL.
- Configure `MONGO_URI` with a production MongoDB database.
- The password reset flow currently returns/logs the reset URL and uses placeholder SMTP credentials. Configure real mail transport settings before using it in production.
- Ensure the frontend API path is routed to the backend. For a split deployment, configure a reverse proxy or update API base URL behavior as needed.

## Development Tips

- Keep both apps running during local development: backend on `8080`, frontend on `5173`.
- Use the health endpoint first when debugging API connectivity.
- If frontend requests fail, confirm the backend port matches the Vite proxy target.
- Admin-only API calls require an `Authorization: Bearer <token>` header.
