const express = require('express');
const cors = require('cors');
require('dotenv').config();
const UserRoutes = require('./Routes/UserRoutes');

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', process.env.CLIENT_URL].filter(Boolean);

const app = express();

app.use(cors({ origin: function (origin, callback){
  if(!origin || allowedOrigins.includes(origin)){
    callback(null, true);
  }else {
    callback(new Error('Not allowed by CORS'));
  }
}}));
app.use(express.json());
app.use('/api', UserRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;