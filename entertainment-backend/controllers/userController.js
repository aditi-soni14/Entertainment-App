
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // ================== REGISTER USER ==================
// export const registerUser = async (req, res) => {
//   try {
//     console.log("Incoming body (register):", req.body);
//     const { username, email, password } = req.body;

//     // Validate all fields
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: newUser._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     // Success response
//     res.status(201).json({
//       message: "Signup successful!",
//       user: newUser,
//       token,
//     });
//   } catch (error) {
//     console.error("Register error:", error.message);
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// // ================== LOGIN USER ==================
// export const loginUser = async (req, res) => {
//   try {
//     console.log("Incoming body (login):", req.body);
//     const { email, password } = req.body;

//     // Validate
//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful!",
//       user,
//       token,
//     });
//   } catch (error) {
//     console.error("Login error:", error.message);
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };


import bcrypt from "bcryptjs"; // Library to hash and compare passwords
import jwt from "jsonwebtoken"; // Library to create JWT tokens
import User from "../models/User.js"; // Mongoose User model

// ================== REGISTER USER ==================
export const registerUser = async (req, res) => {
  try {
    console.log("Incoming body (register):", req.body);
    const { username, email, password } = req.body;

    // Validate that all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if a user with the same email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token for the new user
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token valid for 1 day
    );

    // Respond with success message, user data, and token
    res.status(201).json({
      message: "Signup successful!",
      user: newUser,
      token,
    });
  } catch (error) {
    // Log the error and respond with server error
    console.error("Register error:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ================== LOGIN USER ==================
export const loginUser = async (req, res) => {
  try {
    console.log("Incoming body (login):", req.body);
    const { email, password } = req.body;

    // Validate that all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JWT token for the logged-in user
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token valid for 1 day
    );

    // Respond with success message, user data, and token
    res.json({
      message: "Login successful!",
      user,
      token,
    });
  } catch (error) {
    // Log the error and respond with server error
    console.error("Login error:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
