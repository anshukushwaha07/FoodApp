import User from "../models/User.js";
import admin from "../config/firebase.js";
import generateToken from "../utils/generateToken.js";

// Temporary OTP storage (in production, use Redis or database)
const otpStore = new Map();

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP
export const sendOTP = async (req, res) => {
  try {
    const { contact } = req.body;

    if (!contact) {
      return res.status(400).json({ message: "Contact is required" });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with 5 minute expiry
    otpStore.set(contact, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    // In production, send OTP via SMS/Email service
    // For now, we'll log it (REMOVE IN PRODUCTION)
    console.log(`OTP for ${contact}: ${otp}`);

    res.json({
      success: true,
      message: "OTP sent successfully",
      // REMOVE IN PRODUCTION - only for testing
      otp: process.env.NODE_ENV === "development" ? otp : undefined,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to send OTP" });
  }
};

// Verify OTP and Login
export const verifyOTP = async (req, res) => {
  try {
    const { contact, otp } = req.body;

    if (!contact || !otp) {
      return res.status(400).json({ message: "Contact and OTP are required" });
    }

    // Check if OTP exists
    const storedOTP = otpStore.get(contact);

    if (!storedOTP) {
      return res.status(401).json({ message: "OTP not found or expired" });
    }

    // Check if OTP is expired
    if (Date.now() > storedOTP.expiresAt) {
      otpStore.delete(contact);
      return res.status(401).json({ message: "OTP expired" });
    }

    // Verify OTP
    if (storedOTP.otp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    // OTP is valid, remove it
    otpStore.delete(contact);

    // Check if user exists (by email or phone)
    const isEmail = contact.includes("@");
    let user;

    if (isEmail) {
      user = await User.findOne({ email: contact });
      if (!user) {
        // Create new user with email
        user = await User.create({
          email: contact,
          name: contact.split("@")[0], // Use email prefix as temporary name
        });
      }
    } else {
      user = await User.findOne({ phone: contact });
      if (!user) {
        // Create new user with phone
        user = await User.create({
          phone: contact,
          isPhoneVerified: true,
        });
      }
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "OTP verification failed" });
  }
};

// Email/Password Registration
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Registration failed" });
  }
};

// Email/Password Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Login failed" });
  }
};

// Phone Login/Register (existing)
export const loginOrRegister = async (req, res) => {
  const { phone } = req.body;

  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({ phone });
  }

  const token = generateToken(user._id);
  res.json({ token, user });
};

// Phone Verification (existing)
export const verifyPhone = async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    const phone = decoded.phone_number;

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        phone,
        isPhoneVerified: true,
      });
    } else {
      user.isPhoneVerified = true;
      await user.save();
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid OTP token" });
  }
};