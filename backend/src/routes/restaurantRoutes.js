import express from "express";
import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.post("/", createRestaurant);        // admin
router.get("/", getRestaurants);            // user
router.get("/:id", getRestaurantById);
router.put("/:id", updateRestaurant);       // admin
router.delete("/:id", deleteRestaurant);    // admin

export default router;
