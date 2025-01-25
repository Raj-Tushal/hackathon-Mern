import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
  tokenNumber: { type: String, unique: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
});

export default mongoose.model("Appointment", appointmentSchema);
