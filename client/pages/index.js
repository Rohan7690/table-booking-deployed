import { useState, useRef, useEffect } from "react";
import SlotBooking from "../components/SlotBooking";
import BookingForm from "../components/BookingForm";
import DatePicker from "../components/DatePicker";
import BookingSummary from "../components/BookingSummary";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(""); // Selected date (YYYY-MM-DD format)
  const [selectedSlot, setSelectedSlot] = useState(""); // Selected time slot
  const [bookingSummary, setBookingSummary] = useState(null); // Holds booking summary
  const formRef = useRef(null); // Ref for the BookingForm

  // Handle Date Change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(""); // Reset slot when date changes
  };

  // Handle Slot Selection
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  // Scroll to Booking Form when slot is selected for the first time
  useEffect(() => {
    if (selectedSlot && selectedDate) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedSlot, selectedDate]);

  // Handle Form Submission
  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, date: selectedDate, time: selectedSlot }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message); // Show error message
      } else {
        setBookingSummary({
          ...formData,
          date: selectedDate, // Include the selected date
          time: selectedSlot, // Include the selected time slot
        });
      }
    } catch (error) {
      console.error("Error booking:", error);
      alert("An error occurred while booking. Please try again.");
    }
  };

  const handleReset = () => {
    setSelectedDate(""); // Reset date
    setSelectedSlot(""); // Reset slot
    setBookingSummary(null); // Clear booking summary
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Restaurant Table Booking</h1>

      {bookingSummary ? (
        <BookingSummary booking={bookingSummary} onReset={handleReset} />
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
          <label className="block text-lg font-medium mb-4">
            <DatePicker onDateChange={handleDateChange} />
          </label>

          {selectedDate && (
            <div className="mt-6">
              <SlotBooking selectedDate={selectedDate} onSlotSelect={handleSlotSelect} />
            </div>
          )}

          {selectedSlot && (
            <div ref={formRef} className="mt-6">
              <BookingForm onSubmit={handleSubmit} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
