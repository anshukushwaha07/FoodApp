import express from "express";
import { authWithFirebase } from "../controllers/authController.js";

const router = express.Router();

// The only route you need for Firebase Login/Signup
router.post("/firebase", authWithFirebase);

export default router;