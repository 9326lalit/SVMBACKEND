// import Booking from '../models/Booking.js';
// import validateBooking from '../middlewares/validateBooking.js';

// // Get available slots for a specific date
// export const getAvailableSlots = async (req, res) => {
//   try {
//     const { date } = req.query;
//     const bookings = await Booking.find({ bookingDate: date });

//     // List of all time slots
//     const allTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'];

//     // Get booked times
//     const bookedTimes = bookings.map((b) => b.startTime);

//     // Filter out booked slots
//     const availableSlots = allTimes.filter((time) => !bookedTimes.includes(time));

//     res.status(200).json({ date, availableSlots });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Create a new booking
// export const createBooking = async (req, res) => {
//   try {
//     const bookingData = req.body;

//     // Validate booking
//     await validateBooking(bookingData);

//     // Create the booking
//     const newBooking = await Booking.create(bookingData);
//     res.status(201).json(newBooking);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Get all bookings for a specific date
// export const getBookingsForDate = async (req, res) => {
//   try {
//     const { date } = req.query;
//     const bookings = await Booking.find({ bookingDate: date }).populate('complex user', 'name email');

//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
