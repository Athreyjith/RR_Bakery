const mongoose = require('mongoose');

let connectionPromise;
let adminSeedPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rr-bake-sweet';
    connectionPromise = mongoose.connect(MONGO_URI);
  }

  await connectionPromise;
  return mongoose.connection;
};

const seedDefaultAdmin = async () => {
  if (adminSeedPromise) {
    return adminSeedPromise;
  }

  adminSeedPromise = (async () => {
    const User = require('./models/User');
    const adminExists = await User.findOne({ email: 'admin@rrbake.com' });

    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@rrbake.com',
        password: 'admin123',
        role: 'admin'
      });
    }
  })();

  return adminSeedPromise;
};

module.exports = { connectDB, seedDefaultAdmin };
