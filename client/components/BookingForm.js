import React, { useState, forwardRef } from "react";

// Use forwardRef to pass the ref to the form element
const BookingForm = forwardRef(({ onSubmit }, ref) => {
  const [formData, setFormData] = useState({
    guests: "",
    name: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit(formData);
    } else {
      console.error("onSubmit is not a function.");
    }
  };

  return (
    <form ref={ref} onSubmit={handleSubmit} className="space-y-6">
      {/* Number of Guests */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Number of Guests
        </label>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          min="1"
          required
          className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Contact */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contact
        </label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Book Now
        </button>
      </div>
    </form>
  );
});

export default BookingForm;
