import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export const User =
  mongoose.models.User || mongoose.model("User", userSchema);
