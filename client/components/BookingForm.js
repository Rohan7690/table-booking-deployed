import { useState } from "react";

const BookingForm = ({ onSubmit }) => {
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

    // Frontend validation for contact (phone number)
    const phoneRegex = /^[0-9]{10}$/; // Allow only 10-digit phone numbers
    if (!phoneRegex.test(formData.contact)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (typeof onSubmit === "function") {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contact (Phone Number)
        </label>
        <input
          type="tel" // Use "tel" type for phone numbers
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          pattern="[0-9]{10}" // Ensure only 10-digit numbers
          required
          className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <small className="text-gray-500">Enter a valid 10-digit phone number.</small>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
