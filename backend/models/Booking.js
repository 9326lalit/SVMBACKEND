import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
  },
  date: { type: Date, required: true },
  timeSlot: { type: [String], required: true }, // Array of time slots
  
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);



