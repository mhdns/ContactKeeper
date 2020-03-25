const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

// Init Middleware (Alternative to bodyParser from express)
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts/:id', require('./routes/contacts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}...`);
});
