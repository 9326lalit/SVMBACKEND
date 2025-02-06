import Booking from '../models/Booking.js'; // Import Booking model
import nodemailer from 'nodemailer';







export const createBooking = async (req, res) => {
  try {
    const { serviceId, user, date, timeSlot, totalPrice } = req.body;

    // Validate required fields
    if (!serviceId || !user || !date || !timeSlot || timeSlot.length === 0 || !totalPrice || !user.email) {
      return res.status(400).json({ error: "All fields are required, including user email and at least one time slot." });
    }

    // Create the booking
    const newBooking = await Booking.create({
      serviceId,
      user,
      date,
      timeSlot,
      totalPrice
    });

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email, // Extract email from user object
      subject: 'Booking Confirmation - SVM Sports',
      text: `Hello ${user.name},\n\n🎉 Your booking has been confirmed!\n\n📅 Date: ${date}\n🕒 Time Slot: ${timeSlot.join(", ")}\n💰 Total Price: ₹${totalPrice}\n\nThank you for choosing our service. We look forward to serving you! 🚀\n\nBest regards,\n✨ SVM Sports Pvt. Ltd ✨`
    };

    // Send the email asynchronously
    await transporter.sendMail(mailOptions);

    // Respond with success message
    res.status(201).json({w
      message: "Booking created successfully & email sent!",
      booking: newBooking
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};




export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user'); // Fetch all bookings and populate user data
    res.status(200).json(bookings); // Respond with the bookings
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
};



export const deleteBooking = async (req, res) => {
  const bookingId = req.params.bookingId;
  console.log('Booking ID:', bookingId);  // This should now log '67932bff84baf85a061a6826'

  try {
   

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({
      message: "Booking deleted successfully",
      deletedBooking,
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Failed to delete the booking. Please try again later." });
  }
};







// PATCH request to update the booking status
// Controller function to approve a booking
export const approveBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log('Booking ID:', id);
    console.log('Status:', status);

    // Validate that the status is 'approved'
    if (status !== 'approved') {
      return res.status(400).json({ message: 'Invalid status update' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


const getBookedTimesForDateAndTime = async (date, time) => {
  try {
    // Query the database to check if there's a booking for this date and time
    const booking = await Booking.findOne({ date: date, time: time });

    // Return true if the booking exists (meaning the slot is booked)
    return booking ? true : false;
  } catch (error) {
    console.error('Error checking booking:', error);
    throw new Error('Error checking booking availability');
  }
};


export const checkAvailability = async (req, res) => {
  const { date, timeSlot } = req.query;

  // Log inputs for debugging purposes
  // console.log("Date:", date);
  // console.log("Time Slot:", timeSlot);

  try {
    // Validate input
    if (!date || !timeSlot) {
      return res.status(400).json({
        message: 'Date and time slot are required.',
      });
    }

    // Ensure date is parsed correctly
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        message: 'Invalid date format.',
      });
    }

    // Clean and format the timeSlot (removes extra spaces and ensures correct formatting)
    const formattedTimeSlot = timeSlot.trim();

    // Find existing bookings with the same date and timeSlot
    const existingBookings = await Booking.find({
      date: parsedDate,  // Match the exact date
      timeSlot: formattedTimeSlot,  // Match the exact timeSlot
    });

    // If bookings exist, mark the time slot as unavailable
    if (existingBookings.length > 0) {
      return res.json({
        message: 'This time slot is not available.',
        available: false,
      });
    }

    // If no bookings exist, mark the time slot as available
    return res.json({
      message: 'This time slot is available.',
      available: true,
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    return res.status(500).json({
      message: 'An error occurred while checking availability.',
      error: error.message,
    });
  }
};


