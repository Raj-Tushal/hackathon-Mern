import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  loanPeriod: { type: Number, required: true },
  guarantors: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      cnic: { type: String, required: true },
      location: { type: String },
    },
  ],
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
});

export default mongoose.model("Loan", loanSchema);
