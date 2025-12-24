import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    name: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isPhoneVerified: { type: Boolean, default: false },
    address: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
