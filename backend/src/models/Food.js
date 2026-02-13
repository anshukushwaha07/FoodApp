import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true, index: true },

    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },

    price: { type: Number, required: true }, // Base Price

    // Variants: e.g., Size (Small, Medium, Large)
    category: { type: String, required: true },
    isVeg: { type: Boolean, default: true },

    // Optional: Add-ons
    addons: [{
      name: String, // e.g., "Extra Cheese"
      price: Number
    }],

    isAvailable: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Food", foodSchema);