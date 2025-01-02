const express = require("express");
const Booking = require("../models/Booking");  // Import Booking model
const router = express.Router();

// Create a new booking
router.post("/", async (req, res) => {
  try {
    const { date, time, guests, name, contact } = req.body;

    // Validate input
    if (!date || !time || !guests || !name || !contact) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Check for duplicate booking
    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking) {
      return res.status(400).json({ success: false, message: "Slot already booked." });
    }

    // Create and save the booking
    const booking = new Booking({ date, time, guests, name, contact });
    await booking.save();

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
    try {
      const bookings = await Booking.find();  // Fetch bookings from MongoDB
      res.json(bookings);  // Send the bookings as JSON response
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  });

// Delete a booking
router.delete("/", async (req, res) => {
  try {
    const { date, time } = req.body;
    await Booking.deleteOne({ date, time });
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});
// File: routes/bookings.js
// File: routes/bookings.js
router.get("/booked-slots", async (req, res) => {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ success: false, message: "Date is required." });
    }
  
    try {
      const bookings = await Booking.find({ date });
      const bookedSlots = bookings.map((booking) => booking.time); // Get the booked times
      res.json({ success: true, bookedSlots });
    } catch (error) {
      console.error("Error fetching booked slots:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  });
  
  
module.exports = router;
