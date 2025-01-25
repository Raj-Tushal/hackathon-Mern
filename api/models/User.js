import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  cnic: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  loans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Loan" }],
});

export default mongoose.model("User", userSchema);
