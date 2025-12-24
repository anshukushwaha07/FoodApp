import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    address: String,
    image: String,
    isOpen: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 4,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);
