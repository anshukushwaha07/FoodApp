import express from "express";
import { loginOrRegister,verifyPhone } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginOrRegister);
router.post("/verify-phone", verifyPhone);

export default router;
