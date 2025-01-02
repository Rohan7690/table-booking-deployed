const express = require("express");
const router = express.Router();

// Dummy in-memory bookings data (replace with DB logic)
let bookings = [];

// Handle POST requests for creating a new booking
router.post("/", (req, res) => {
  const { name, guests, contact, date, time } = req.body;
  
  if (!name || !guests || !contact || !date || !time) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const newBooking = { name, guests, contact, date, time };
  bookings.push(newBooking);

  res.status(201).json({ success: true, booking: newBooking });
});

// Handle GET requests for fetching bookings (or bookings for a specific date)
router.get("/", (req, res) => {
  const { date } = req.query;
  
  if (date) {
    const filteredBookings = bookings.filter((booking) => booking.date === date);
    return res.status(200).json({ success: true, bookings: filteredBookings });
  }

  res.status(200).json({ success: true, bookings });
});

module.exports = router;
