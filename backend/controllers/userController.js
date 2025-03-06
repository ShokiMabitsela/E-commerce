import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


// Create token function
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
     console.log(email);
    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Find user by email
    const user = await userModel.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate token
    const token = createToken(user._id);

    // Respond with user data and token
    res.status(200).json({ 
      success: true, 
      token, 
      user: { name: user.name || "User", email: user.email } 
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later.", error: error.message });
  }
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Check if user already exists
    const exists = await userModel.findOne({ email: normalizedEmail });

    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(normalizedEmail)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password strength
    if (!validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      return res.status(400).json({ success: false, message: "Password must be strong (8+ chars, uppercase, lowercase, number, symbol)." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user
    const newUser = new userModel({ name, email: normalizedEmail, password: hashedPassword, role: "User" });
    const user = await newUser.save();

    // Generate token
    const token = createToken(user._id);

    // Respond with success and user data
    res.status(201).json({ 
      success: true, 
      message: "User successfully registered", 
      token, 
      user: { id: user._id, name: user.name, email: user.email } 
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later.", error: error.message });
  }
};

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Check for admin credentials
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate token for admin
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1h" });

    // Respond with token
    res.status(200).json({ success: true, token });

  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

export { loginUser, registerUser, adminLogin };
