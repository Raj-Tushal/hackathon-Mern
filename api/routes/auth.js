import express from "express";
import { registerUser, loginUser, proceedLoan, changePassword } from "../controllers/auth.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

router.post("/proceed", proceedLoan);

router.put("/changePassword", changePassword);

export default router;
