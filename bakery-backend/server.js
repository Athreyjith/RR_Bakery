const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`RR Bake & Sweet Server running on port ${PORT}`);
});
