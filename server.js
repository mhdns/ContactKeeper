const express = require('express');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

// Init Middleware (Alternative to bodyParser from express)
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the ContactKeeper API...' });
});

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts/:id', require('./routes/contacts'));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}...`);
});
