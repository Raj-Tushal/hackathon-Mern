import express from "express";
import {
  registerUser,
  submitLoanRequest,
  addGuarantors,
  getLoanDetails,
  generateSlip,
} from "../controllers/user.js";
import { loginUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/loan/request", submitLoanRequest);
router.post("/loan/guarantors", addGuarantors);
router.get("/loan/details/:loanId", getLoanDetails);
router.get("/loan/slip/:loanId", generateSlip);

export default router;
