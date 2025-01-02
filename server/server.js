const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const serverless = require("serverless-http");

dotenv.config();  // Load environment variables

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

// Import routes
const bookingRoutes = require("./routes/bookings");  // Import the booking routes
app.use("/api/bookings", bookingRoutes);

// Export the Express app as a serverless function
module.exports.handler = serverless(app);
