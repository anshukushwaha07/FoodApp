import User from "../models/User.js";
import admin from "../config/firebase.js";
import generateToken from "../utils/generateToken.js";

/**
 * @desc    Authenticate user via Firebase ID Token (Phone or Email)
 * @route   POST /api/auth/firebase
 * @access  Public
 */
export const authWithFirebase = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "Firebase ID token is required",
      });
    }

    // 1. Verify the ID token with Firebase Admin
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired Firebase token",
      });
    }

    const { uid, phone_number, email, name, picture } = decodedToken;

    // 2. Check if user exists in YOUR database
    // Phone numbers in Firebase format are usually E.164 (e.g., +919999999999)
    let user;

    if (phone_number) {
      user = await User.findOne({ phone: phone_number });
    } else if (email) {
      user = await User.findOne({ email: email });
    }

    // 3. If user doesn't exist, Register them
    if (!user) {
      user = await User.create({
        name: name || (phone_number ? `User ${phone_number.slice(-4)}` : "New User"),
        email: email || "",
        phone: phone_number || "",
        firebaseUid: uid,
        profilePic: picture || "",
        isPhoneVerified: !!phone_number, // True if they logged in via phone
        role: "user", // Default role
      });
      console.log("New user created via Firebase:", user._id);
    } else {
      // 4. If user exists, update their Firebase UID just in case it changed
      user.firebaseUid = uid;
      if (phone_number && !user.isPhoneVerified) user.isPhoneVerified = true;
      await user.save();
    }

    // 5. Generate your own JWT for session management
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isPhoneVerified: user.isPhoneVerified,
      },
    });

  } catch (error) {
    console.error("Firebase Auth Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};