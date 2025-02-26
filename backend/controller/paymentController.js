import razorpayInstance from "../utils/razorpay.js";
import Order from "../models/razorpay.js";

 const createOrder = async (req, res) => {
    try {
        const { amount, currency, userId } = req.body;

        const options = {
            amount: amount * 100, // Amount in paise
            currency: currency || "INR",
        };
        if(amount == 0){
            const newOrder = new Order({
                razorpayOrderId: 0,
                userId,
                amount,
                currency,
                status: "created",
            });
            await newOrder.save();
            return res.status(201).json({ success: true, order: newOrder, isAmountZero: true, message: "Zero amount order created successfully" });
        }
        // Create Razorpay order
        const order = await razorpayInstance.orders.create(options);

        // Save the order in the database
        const newOrder = new Order({
            razorpayOrderId: order.id,
            userId,
            amount,
            currency,
            status: "created",
        });

        await newOrder.save();

        res.status(201).json({ success: true, isAmountZero: false, order: newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export default createOrder;