import Loan from "../models/Loan.js";

export const viewApplications = async (req, res) => {
  try {
    const loans = await Loan.find().populate("userId");
    res.status(200).json({ message: "Applications fetched successfully", loans });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const loan = await Loan.findByIdAndUpdate(id, { status }, { new: true });
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.status(200).json({ message: "Application status updated", loan });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
};
