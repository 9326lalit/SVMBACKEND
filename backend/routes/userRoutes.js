import express from 'express';
import { createUser, getUserProfile, loginUser, allUsers } from '../controller/userController.js';

const router = express.Router();

// Route to create a new user
router.post('/api/users', createUser);

// Route for user login
router.post('/api/login', loginUser);

router.get('/api/allusers', allUsers)

// Route for user profile (authenticated)
router.get('/api/profile', getUserProfile);

export default router;
