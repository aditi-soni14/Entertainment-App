import mongoose from "mongoose";

// ================== USER SCHEMA ==================
const userSchema = new mongoose.Schema(
  {
    // Username field, required
    username: { type: String, required: true },

    // Email field, required and unique
    email: { type: String, required: true, unique: true },

    // Password field, required
    password: { type: String, required: true },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Create a Mongoose model from the schema
const User = mongoose.model("User", userSchema);

// Export the User model
export default User;
