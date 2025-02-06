import express from "express";
import { createBooking, getBookings, approveBooking ,checkAvailability, deleteBooking} from "../controller/bookingController.js"; // Import the controller functions

const router = express.Router();


// Route to create a new booking
router.post("/api/booking", createBooking);

// // Route to get all bookings
router.get("/api/getallbookings", getBookings);

router.patch('/api/bookings/:id', approveBooking);

// router.delete('/api/dltbooking/:id', deleteBooking);

// In your server/router file, update the route to match the correct URL
router.delete('/api/dltbooking/:bookingId', deleteBooking);



router.get('/api/checkavailability', checkAvailability);

export default router;
