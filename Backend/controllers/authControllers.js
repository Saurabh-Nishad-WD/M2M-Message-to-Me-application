import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Secret key for JWT
const JWT_SECRET = process.env.KEY;

// Sign-up function
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required! (ie. name,email,password)' });
    }

    try {
        // Check if the email is already registered
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email is already registered!' });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};

// Sign-in function
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }
     try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password!' });
        }
 
        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password!' });
        }
 
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.KEY, { expiresIn: '1h' });
 
        res.json({ message: 'Login successful!', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};
