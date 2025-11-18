// import mongoose from "mongoose"; // Import Mongoose for MongoDB interactions

// // Function to connect to MongoDB
// export const connectDB = async () => {
//   try {
//     // Connect to MongoDB using the URI from environment variables
//     await mongoose.connect(process.env.MONGO_URI);

//     // Log success message if connection is successful
//     console.log(" MongoDB Connected Successfully");
//   } catch (error) {
//     // Log error message if connection fails
//     console.error(" MongoDB Connection Failed:", error.message);

//     // Exit the process with failure code
//     process.exit(1);
//   }
// };

// // Export the connectDB function as default
// export default connectDB;


///18/11/25
// config/db.js
// import mongoose from "mongoose";

// // Function to connect to MongoDB
// export const connectDB = async () => {
//   try {
//     // Use environment variable MONGO_URL (make sure your .env matches)
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("MongoDB Connected Successfully");
//   } catch (error) {
//     console.error("MongoDB Connection Failed:", error.message);
//     process.exit(1); // Exit process with failure
//   }
// };

// export default connectDB;


//just try

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
  }
};
export default connectDB;