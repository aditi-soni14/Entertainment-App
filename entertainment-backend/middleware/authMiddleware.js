// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer "))
//     return res.status(401).json({ message: "Unauthorized" });

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id, email }
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Token invalid" });
//   }
// };


import jwt from "jsonwebtoken"; // Library to verify JWT tokens

// ================== PROTECT ROUTES MIDDLEWARE ==================
export const protect = (req, res, next) => {
  // Get Authorization header from request
  const authHeader = req.headers.authorization;

  // Check if header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" }); // No token provided
  }

  // Extract the token from header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info (id, email) to request object
    req.user = decoded;

    // Call next middleware or route handler
    next();
  } catch (err) {
    // Token invalid or expired
    return res.status(401).json({ message: "Token invalid" });
  }
};
