import Order from "../models/razorpay.js";

const razorpayWebhook = async (req, res) => {
    try {
        const { event, payload } = req.body;

        if (event === "payment.captured") {
            const { order_id } = payload.payment.entity;

            // Update payment status in the database
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: order_id },
                { status: "paid" },
                { new: true }
            );

            if (order) {
                console.log(`Payment received for vendor: ${order.vendorId}`);
            }
        }

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export default razorpayWebhook;
