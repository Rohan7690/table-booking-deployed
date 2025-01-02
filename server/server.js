const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();  // Load environment variables
const cors = require("cors");
const bookingRoutes = require("./routes/bookings");  // Import the booking routes

const app = express();

// Middleware setup
app.use(cors());  
app.use(express.json());  // Parse incoming JSON requests

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use booking routes for all /api/bookings requests
app.use("/api/bookings", bookingRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
