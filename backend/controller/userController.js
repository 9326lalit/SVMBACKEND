import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      user: { username, email, role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Assume req.userId is set by middleware
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const allUsers = async(req,res) =>
{
  try{

    const user = await User.find();
    res.status(200).json(user);
  }
  catch(error )
  {
    res.status(500).json({ error: error.message });

  }
}