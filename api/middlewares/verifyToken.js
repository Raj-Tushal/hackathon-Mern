import jwt from "jsonwebtoken";
import { sendError } from "../utils/response.js";

const verifyToken = (req, res, next) => {
  // Step 1: Get the authorization header
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader) {
    return res.status(401).json(sendError({ message: "No token provided" }));
  }

  // Step 2: Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json(sendError({ message: "Token format is invalid. Expected 'Bearer <token>'" }));
  }

  // Step 3: Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Log the error for debugging in development mode
      if (process.env.NODE_ENV === "development") {
        console.log("Token verification failed:", err.message);
      }
      return res.status(403).json(sendError({ message: "Invalid token" }));
    }

    // Step 4: Attach decoded user data to the request object
    req.user = decoded;
    
    // Step 5: Move to the next middleware or route handler
    next();
  });
};

export default verifyToken;
