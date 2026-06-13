const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rr-bake-sweet';

mongoose.connect(MONGO_URI).then(async () => {
  const User = require('./models/User'); // load User model

  let user = await User.findOne({email: 'admin@rrbake.com'});
  console.log('User found:', !!user);

  if (user) {
    const match = await bcrypt.compare('admin123', user.password);
    console.log('Password match for admin123:', match);

    if (!match) {
      console.log('Resetting password explicitly via hook');
      user.password = 'admin123';
      await user.save();
      console.log('Password reset to admin123. Should work now.');
    }
  } else {
    console.log('Creating user just in case DB was empty here');
    await User.create({
      name: 'Admin',
      email: 'admin@rrbake.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('User created!');
  }
  process.exit();
}).catch(console.error);
