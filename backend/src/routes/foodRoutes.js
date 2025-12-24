import express from "express";
import {
  createFood,
  getAllFoods,
  getFoodsByRestaurant,
  getFoodById,
  updateFood,
  deleteFood,
} from "../controllers/foodController.js";

const router = express.Router();

router.post("/", createFood); // admin
router.get("/", getAllFoods);
router.get("/restaurant/:restaurantId", getFoodsByRestaurant);
router.get("/:id", getFoodById);
router.put("/:id", updateFood); // admin
router.delete("/:id", deleteFood); // admin

export default router;
