const express = require('express');
const cors = require('cors');
require('dotenv').config();
const UserRoutes = require('./Routes/UserRoutes');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL}));
app.use(express.json());
app.use('/api', UserRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;