import React from "react";

const BookingSummary = ({ booking, onReset }) => {
  if (!booking) {
    return (
      <p className="text-red-500 font-medium">
        No booking details available.
      </p>
    ); // Handle edge case where booking is undefined
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
      {/* Confirmation Message */}
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Your Table Booking is Confirmed!
      </h2>
      <p className="text-lg text-gray-700 mb-4">
        Thank you for booking with us. Below are your booking details:
      </p>

      {/* Booking Details */}
      <div className="space-y-2">
        <p className="text-gray-700">
          <strong>Date:</strong> {booking.date || "Not specified"}
        </p>
        <p className="text-gray-700">
          <strong>Time:</strong> {booking.time || "Not specified"}
        </p>
        <p className="text-gray-700">
          <strong>Name:</strong> {booking.name || "Not specified"}
        </p>
        <p className="text-gray-700">
          <strong>Guests:</strong> {booking.guests || "Not specified"}
        </p>
        <p className="text-gray-700">
          <strong>Contact:</strong> {booking.contact || "Not specified"}
        </p>
      </div>

      {/* Button to reset and book another slot */}
      <button
        onClick={onReset}
        className="mt-6 w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Book Another Slot
      </button>
    </div>
  );
};

export default BookingSummary;
