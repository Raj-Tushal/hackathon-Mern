import User from "../models/User.js";
import Loan from "../models/Loan.js";
import Appointment from "../models/Appointment.js";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { cnic, email, name, password } = req.body;
    const user = new User({ cnic, email, name, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// Submit a loan request
export const submitLoanRequest = async (req, res) => {
  try {
    const { userId, category, subCategory, loanAmount, loanPeriod } = req.body;
    const loan = new Loan({ userId, category, subCategory, loanAmount, loanPeriod });
    await loan.save();
    res.status(201).json({ message: "Loan request submitted successfully", loan });
  } catch (error) {
    res.status(500).json({ message: "Error submitting loan request", error: error.message });
  }
};

// Generate an appointment slip for a loan
export const generateSlip = async (req, res) => {
  try {
    const { loanId } = req.params;
    const loan = await Loan.findById(loanId).populate("userId");
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    const tokenNumber = `TOKEN-${Date.now()}`;
    const appointment = new Appointment({
      userId: loan.userId._id,
      loanId,
      tokenNumber,
      date: new Date(),
      time: "10:00 AM",
      location: "Saylani Office",
    });
    await appointment.save();

    res.status(201).json({
      message: "Slip generated successfully",
      slip: {
        tokenNumber,
        appointment,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating slip", error: error.message });
  }
};

// Add a guarantor for a loan
export const addGuarantors = async (req, res) => {
  try {
    const { loanId, guarantorName, guarantorCnic, guarantorContact } = req.body;

    // Find the loan by ID
    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    // Add guarantor details to the loan
    loan.guarantor = {
      name: guarantorName,
      cnic: guarantorCnic,
      contact: guarantorContact,
    };

    // Save the updated loan
    await loan.save();

    res.status(200).json({
      message: "Guarantor added successfully",
      loan,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding guarantor", error: error.message });
  }
};

export const getLoanDetails = async (req, res) => {
    try {
      const { loanId } = req.params;
  
      // Find the loan by ID and populate related user data
      const loan = await Loan.findById(loanId).populate("userId", "name email cnic");
      if (!loan) return res.status(404).json({ message: "Loan not found" });
  
      res.status(200).json({
        message: "Loan details retrieved successfully",
        loan: {
          id: loan._id,
          user: loan.userId,
          category: loan.category,
          subCategory: loan.subCategory,
          loanAmount: loan.loanAmount,
          loanPeriod: loan.loanPeriod,
          guarantor: loan.guarantor || "No guarantor assigned",
          createdAt: loan.createdAt,
          updatedAt: loan.updatedAt,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving loan details", error: error.message });
    }
  };