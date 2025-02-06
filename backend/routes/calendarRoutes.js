import express from 'express';
import { getAvailableSlots, createBooking, getBookingsForDate } from '../controller/bookingController.js';

const router = express.Router();

// Route to get available slots for a specific date
// router.get('/available-slots', getAvailableSlots);

// Route to create a new booking
router.post('/create-booking', createBooking);

// Route to get all bookings for a specific date
// router.get('/bookings', getBookingsForDate);

export default router;
