import express from "express";
import {
  createFood,
  getAllFoods,
  getFoodsByRestaurant,
  getFoodById,
  updateFood,
  deleteFood,
} from "../controllers/foodController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getAllFoods);
router.get("/restaurant/:restaurantId", getFoodsByRestaurant);
router.get("/:id", getFoodById);

router.post("/", protect, adminOnly, createFood);
router.put("/:id", protect, adminOnly, updateFood);
router.delete("/:id", protect, adminOnly, deleteFood);

export default router;
