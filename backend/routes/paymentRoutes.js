import express from "express";
import  createOrder  from "../controller/paymentController.js";
import razorpayWebhook from "../webhooks/razorpayWebhooks.js";


const router = express.Router();

router.post("/api/payments/payment", createOrder);

// Razorpay webhook
router.post("/webhook", razorpayWebhook);

export default router;
