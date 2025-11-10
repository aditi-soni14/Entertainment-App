// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ MongoDB Connected Successfully");
//   } catch (error) {
//     console.error(" MongoDB Connection Failed:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;


import mongoose from "mongoose"; // Import Mongoose for MongoDB interactions

// Function to connect to MongoDB
export const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);

    // Log success message if connection is successful
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    // Log error message if connection fails
    console.error(" MongoDB Connection Failed:", error.message);

    // Exit the process with failure code
    process.exit(1);
  }
};

// Export the connectDB function as default
export default connectDB;
