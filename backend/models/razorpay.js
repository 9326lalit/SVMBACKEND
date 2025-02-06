import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    razorpayOrderId: { type: String, required: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: {
type: String,
default: "INR",
},
    status: { type: String, required: true, default: "created" }, // created, paid, failed
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
