import Food from "../models/Food.js";
import Restaurant from "../models/Restaurant.js";

// ➕ Add Food (Admin)
export const createFood = async (req, res) => {
  const restaurantExists = await Restaurant.findById(req.body.restaurant);
  if (!restaurantExists) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  const food = await Food.create(req.body);
  res.status(201).json(food);
};

// 📃 Get All Foods
export const getAllFoods = async (req, res) => {
  const foods = await Food.find().populate("restaurant", "name");
  res.json(foods);
};

// 🍽 Get Foods by Restaurant
export const getFoodsByRestaurant = async (req, res) => {
  const foods = await Food.find({
    restaurant: req.params.restaurantId,
  });
  res.json(foods);
};

// 🔍 Get Single Food
export const getFoodById = async (req, res) => {
  const food = await Food.findById(req.params.id).populate(
    "restaurant",
    "name address"
  );
  if (!food) {
    return res.status(404).json({ message: "Food not found" });
  }
  res.json(food);
};

// ✏ Update Food (Admin)
export const updateFood = async (req, res) => {
  const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(food);
};

// ❌ Delete Food (Admin)
export const deleteFood = async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);
  res.json({ message: "Food deleted" });
};
