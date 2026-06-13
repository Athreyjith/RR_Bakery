# Vercel Migration Plan

To convert your monolithic Express backend into Vercel-compatible serverless functions, you need to eliminate the persistent server (`app.listen` / `server.js`) and transition routing entirely to Vercel's file-system based routing in an `/api` directory.

Here is the production-ready structure and all the example files you need.

## 1. Production-Ready Folder Structure

Create a unified repository with the standard Vercel frontend + serverless backend structure.

```text
rr/
├── client/                     # (Rename bakery-frontend to client, or point Vercel Root to bakery-frontend)
│   ├── package.json
│   ├── vite.config.js          
│   ├── src/
│   │   └── services/
│   │       └── api.js          # Keep baseURL: '/api' 
│   └── ...
├── api/                        # Vercel Serverless Functions (Replaces Routes)
│   ├── auth/
│   │   ├── login.js
│   │   ├── register.js
│   │   └── me.js
│   ├── products/
│   │   ├── index.js            # Handles GET /api/products, POST /api/products
│   │   └── [id].js             # Handles GET /api/products/:id, PUT, DELETE
│   └── debts/
│       └── ...
├── controllers/                # Your existing logic goes here
│   ├── productController.js
│   └── authController.js
├── models/                     # Mongoose schemas
│   ├── Product.js
│   └── User.js
├── middleware/                 
│   └── auth.js                 # Adapted for serverless
├── lib/
│   └── dbConnect.js            # Singleton MongoDB Connection
├── package.json                # Root package.json (Backend deps + type: module)
└── vercel.json                 # Optional routing configurations
```

> **Vercel Settings:** In your Vercel project dashboard, set the **Framework Preset** to Vite and your **Root Directory** to `client` (or whatever your Vite folder is named). Vercel will still automatically detect the `/api` folder at your project root.

---


## 2. run

install nom
npm run dev

## 3. Reusable MongoDB Connection (`lib/dbConnect.js`)

In serverless environments, standard `mongoose.connect()` will spawn a new connection on every request, quickly maxing out your database connection limits. You must cache the connection globally.

```javascript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Turn off buffering on schemas
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}
```

---

## 4. Adapting Middlewares for Serverless (`middleware/auth.js`)

Because Express middlewares rely on `next()`, we need a helper function to run them inside Vercel handler functions. Here is how your `auth.js` should look:

```javascript
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Helper to run middleware sequentially in serverless functions
export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized. No token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found.' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired.' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Admins only.' });
};
```

---

## 5. API Endpoints (`api/products/index.js`)

Instead of defining explicit routes on an express `router`, Vercel maps file paths to URLs automatically. The file `api/products/index.js` acts as the `GET /api/products` and `POST /api/products` endpoint.

```javascript
import dbConnect from '../../lib/dbConnect.js';
import { getProducts, createProduct } from '../../controllers/productController.js';
import { protect, adminOnly, runMiddleware } from '../../middleware/auth.js';

export default async function handler(req, res) {
  // Ensure DB is connected before doing anything
  await dbConnect();

  // Handle request based on the HTTP Method
  switch (req.method) {
    case 'GET':
      // Open endpoint, no middleware
      return getProducts(req, res);
      
    case 'POST':
      try {
        // Run middlewares sequentially using our helper wrapper
        await runMiddleware(req, res, protect);
        await runMiddleware(req, res, adminOnly);
        
        // Output result
        return createProduct(req, res);
      } catch (err) {
        // Responses sent by middlewares will abort the execution early via next(err) / catch
        return; 
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

---

## 6. Dynamic API Endpoints (`api/products/[id].js`)

For dynamic paths like (`/api/products/:id`), you use bracket syntax in the filename: `[id].js`. Vercel will pass the ID into `req.query.id`.

```javascript
import dbConnect from '../../lib/dbConnect.js';
import { getProduct, updateProduct, deleteProduct } from '../../controllers/productController.js';
import { protect, adminOnly, runMiddleware } from '../../middleware/auth.js';

export default async function handler(req, res) {
  await dbConnect();

  // Vercel auto-populates req.query.id from the filename `[id].js`
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      return getProduct(req, res); // Make sure your controller expects id from req.query or req.params

    case 'PUT':
      try {
        await runMiddleware(req, res, protect);
        await runMiddleware(req, res, adminOnly);
        // Map req.query.id to req.params.id to keep your controllers untouched!
        req.params = { ...req.params, id }; 
        return updateProduct(req, res);
      } catch (err) {}
      break;

    case 'DELETE':
      try {
        await runMiddleware(req, res, protect);
        await runMiddleware(req, res, adminOnly);
        req.params = { ...req.params, id }; 
        return deleteProduct(req, res);
      } catch (err) {}
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

---

## 7. Keeping Your Controllers Untouched

Because Vercel handlers still provide standard `req` and `res` objects (the same ones Express uses), your controller logic requires **zero changes** as long as you simulate `req.params` when assigning `req.query.id` inside the dynamic parameter brackets.

```javascript
// controllers/productController.js stays virtually the same!
import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

*(Note: Don't forget to update your package.json to include `"type": "module"` if you switch to `import / export` syntax).*
