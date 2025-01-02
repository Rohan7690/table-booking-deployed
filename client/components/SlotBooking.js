import { useState, useEffect } from "react";

const SlotBooking = ({ selectedDate, onSlotSelect }) => {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [error, setError] = useState(null);

  const allSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", 
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
    "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
  ];

  useEffect(() => {
    // If selectedDate is empty, return immediately
    if (!selectedDate) return;

    const fetchBookedSlots = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/booked-slots?date=${selectedDate}`
        );

        // Check if the response is not OK (non-2xx status)
        if (!response.ok) {
          const errorMessage = `Error: ${response.statusText || "Failed to fetch"}`;
          setError(errorMessage);
          throw new Error(errorMessage);
        }

        const data = await response.json();

        // If the response has success key
        if (data.success) {
          setBookedSlots(data.bookedSlots);  // Update booked slots
        } else {
          setError(data.message || "Something went wrong");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching booked slots:", error);
      }
    };

    fetchBookedSlots();
  }, [selectedDate]);

  useEffect(() => {
    // Filter available slots based on booked slots and current date/time
    const available = allSlots.filter((slot) => {
      const isBooked = bookedSlots.includes(slot); // Check if the slot is booked
      
      // Get the current date and time
      const currentDate = new Date();
      const [slotHour, slotMinute] = slot.split(":");
      const slotTime = new Date(selectedDate);
      slotTime.setHours(slotHour, slotMinute, 0, 0); // Set the time for the selected date slot

      // Ensure the slot is in the future (or is available and not booked)
      return !isBooked && slotTime > currentDate; // Slot is available if it's not booked and in the future
    });

    setAvailableSlots(available);  // Update available slots
  }, [bookedSlots, selectedDate]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Select a Time Slot</h3>

      {/* Show error message if any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* If available slots exist, show buttons */}
      {availableSlots.length > 0 ? (
        <div className="grid grid-cols-4 gap-2">
          {availableSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => onSlotSelect(slot)}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {slot}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No slots available for the selected date.</p>
      )}
    </div>
  );
};

export default SlotBooking;
