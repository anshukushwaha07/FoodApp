import User from "../models/User.js";
import admin from "../config/firebase.js";
import generateToken from "../utils/generateToken.js";

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