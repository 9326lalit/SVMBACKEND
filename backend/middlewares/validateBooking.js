import Booking from '../models/Booking.js';
import Complex from '../models/Complex.js';

// Validate booking data
const validateBooking = async (bookingData) => {
  const { complexId, userId, bookingDate, startTime, endTime } = bookingData;

  if (!complexId || !userId || !bookingDate || !startTime || !endTime) {
    throw new Error('All fields are required: complexId, userId, bookingDate, startTime, endTime');
  }

  const complex = await Complex.findById(complexId);
  if (!complex) {
    throw new Error('The selected complex does not exist');
  }

  const overlappingBooking = await Booking.findOne({
    complex: complexId,
    bookingDate: bookingDate,
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } },
    ],
  });

  if (overlappingBooking) {
    throw new Error('This time slot is already booked. Please select a different time.');
  }

  return true;
};

export default validateBooking;
