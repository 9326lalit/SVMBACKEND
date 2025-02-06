import express from 'express';
import connectDB from './config/db.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Server setup
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
