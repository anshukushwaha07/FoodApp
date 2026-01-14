import express from "express";
import { 
  register, 
  login, 
  loginOrRegister, 
  verifyPhone,
  sendOTP,
  verifyOTP
} from "../controllers/authController.js";

const router = express.Router();

// OTP-based authentication
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

// Email/Password routes
router.post("/register", register);
router.post("/login", login);

// Phone authentication routes
router.post("/phone-login", loginOrRegister);
router.post("/verify-phone", verifyPhone);

export default router;
