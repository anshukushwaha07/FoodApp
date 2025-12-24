import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,

    price: {
      type: Number,
      required: true,
    },

    image: String,

    category: {
      type: String,
      enum: ["veg", "non-veg", "snacks", "drinks"],
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Food", foodSchema);
