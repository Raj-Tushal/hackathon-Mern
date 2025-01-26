import User from "../models/User.js";
import { sendSuccess, sendError } from "../utils/response.js";

// Apply for a Loan
export const applyForLoan = async (req, res) => {
  try {
    const { loanType, subCategory, amount, loanPeriod, guarantors } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(sendError({ message: "User not found" }));
    }

    user.loans.push({
      loanType,
      subCategory,
      amount,
      loanPeriod,
      guarantors,
    });

    await user.save();
    res.status(201).json(sendSuccess({ message: "Loan application submitted" }));
  } catch (error) {
    res.status(500).json(sendError({ message: error.message }));
  }
};

// Admin: Get All Loan Applications
export const getAllApplications = async (req, res) => {
  try {
    const adminId = req.user.id;
    const admin = await User.findById(adminId);

    if (!admin || !admin.isAdmin) {
      return res.status(403).json(sendError({ message: "Access denied" }));
    }

    const users = await User.find({ "loans.0": { $exists: true } }, { loans: 1, name: 1, email: 1 });
    res.status(200).json(
      sendSuccess({
        message: "Loan applications retrieved",
        data: users,
      })
    );
  } catch (error) {
    res.status(500).json(sendError({ message: error.message }));
  }
};

// Admin: Update Loan Status
export const updateLoanStatus = async (req, res) => {
  try {
    const { loanId, status } = req.body;
    const adminId = req.user.id;

    const admin = await User.findById(adminId);
    if (!admin || !admin.isAdmin) {
      return res.status(403).json(sendError({ message: "Access denied" }));
    }

    const user = await User.findOne({ "loans._id": loanId });
    if (!user) {
      return res.status(404).json(sendError({ message: "Loan application not found" }));
    }

    const loan = user.loans.id(loanId);
    loan.status = status;
    await user.save();

    res.status(200).json(sendSuccess({ message: "Loan status updated" }));
  } catch (error) {
    res.status(500).json(sendError({ message: error.message }));
  }
};
