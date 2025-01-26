import express from "express";
import { applyForLoan, getAllApplications, updateLoanStatus } from "../controllers/loan.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// Apply for Loan (User)
router.post("/apply", verifyToken, applyForLoan);

// Get All Loan Applications (Admin)
router.get("/applications", verifyToken, verifyAdmin, getAllApplications);

// Update Loan Status (Admin)
router.put("/application/:id/status", verifyToken, verifyAdmin, updateLoanStatus);

export default router;
