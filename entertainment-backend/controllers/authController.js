// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password)
//       return res.status(400).json({ message: "Please provide name, email and password" });

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({ message: "User registered successfully", user: { id: newUser._id, name: newUser.name, email: newUser.email } });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ message: "Please provide email and password" });

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid email or password" });

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "2d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


import bcrypt from "bcryptjs"; // For hashing and comparing passwords
import jwt from "jsonwebtoken"; // For generating JSON Web Tokens
import User from "../models/User.js"; // Mongoose User model

// Controller to register a new user
export const registerUser = async (req, res) => {
  try {
    // Destructure name, email, password from request body
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email and password" });
    }

    // Check if user already exists with the given email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Respond with success and basic user info (excluding password)
    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    // Log error and respond with server error
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to login an existing user
export const loginUser = async (req, res) => {
  try {
    // Destructure email and password from request body
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" } // Token valid for 2 days
    );

    // Respond with token and basic user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    // Log error and respond with server error
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
