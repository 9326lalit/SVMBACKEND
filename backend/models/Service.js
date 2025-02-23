import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  duration: { type: Number },
  availableDates: { type: [Date]}, // Ensure it accepts an array of dates
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

export default Service;
