export default function handler(req, res) {
    let bookings = [];
    if (req.method === "POST") {
      const { date, time, guests, name, contact } = req.body;
      const exists = bookings.some(
        (booking) => booking.date === date && booking.time === time
      );
      if (exists) {
        return res.status(400).json({ success: false, message: "Slot already booked." });
      }else{
      bookings.push({ date, time, guests, name, contact });
      return res.status(200).json({ success: true });
      }
    } else if (req.method === "GET") {
      return res.status(200).json(bookings);
    } else if (req.method === "DELETE") {
      const { date, time } = req.body;
      bookings = bookings.filter(
        (booking) => booking.date !== date || booking.time !== time
      );
      return res.status(200).json({ success: true });
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  }
  