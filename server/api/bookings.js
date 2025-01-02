// api/bookings.js (this file will be deployed as a serverless function)
const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());  // For parsing JSON requests

// Example of a POST route
app.post('/api/bookings', (req, res) => {
  const { name, guests, contact, date, time } = req.body;
  // Here, add logic to handle the booking (e.g., saving to the database)
  res.status(200).json({ success: true, booking: { name, guests, contact, date, time } });
});

// Export the Express app as a serverless function
module.exports.handler = serverless(app);
