import express from "express";
import { 
  register, 
  login, 
  loginOrRegister, 
  verifyPhone 
} from "../controllers/authController.js";

const router = express.Router();

// Email/Password routes
router.post("/register", register);
router.post("/login", login);

// Phone authentication routes
router.post("/phone-login", loginOrRegister);
router.post("/verify-phone", verifyPhone);

export default router;
