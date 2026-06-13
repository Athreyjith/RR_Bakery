const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/rr-bake-sweet').then(async () => {
  const db = mongoose.connection.db;
  const res = await db.collection('users').updateMany(
    { name: /Hitesh/i }, 
    { $set: { name: 'RR Bake' } }
  );
  console.log('Updated users matching Hitesh Sevlani:', res.modifiedCount);
  process.exit();
}).catch(console.error);
