import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },

  // For email/password users
  password: { type: String },

  // For OAuth users
  provider: { type: String }, // "google" | "github"
  providerId: { type: String },

  reviewsUsed: { type: Number, default: 0 },
  plan: { type: String, default: "free" },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", userSchema);