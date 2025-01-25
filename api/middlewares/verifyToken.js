import jwt from "jsonwebtoken";
import { sendError, sendSuccess } from "../utils/response.js";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
//   console.log("Extracted Token:", token);

  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) {
    //   console.log("Token verification failed:", err.message);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
// console.log("Decoded User:", req.user);
    next();
  });
};


export default verifyToken;
