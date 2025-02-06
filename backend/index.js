import express from 'express';
import dotenv from 'dotenv';
import connectDB  from "./config/db.js";
import cors from 'cors';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import couponRoutes from './routes/couponRoutes.js';

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middlewares
app.use(
  cors({
    origin:"*",
    // origin: [''], // Replace with your frontend URL
    methods : ["POST","GET","DELETE"],
    credentials: true,
  })
);
app.use(cors());

app.use(express.json());
app.use(bookingRoutes); // Use the routes defined in bookingRoutes
app.use(userRoutes);
app.use(serviceRoutes); // This will make your service routes available under /api/services
app.use(paymentRoutes);
app.use(couponRoutes);

// Routes
// app.use("/api/payments", paymentRoutes);


// POST request to create a booking


// Start Server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
