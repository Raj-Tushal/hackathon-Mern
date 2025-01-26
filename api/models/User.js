import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }, // Admin flag
    cnic: { type: String, required: true, unique: true },
    loans: [
      {
        loanType: { type: String, required: true },
        subCategory: { type: String },
        amount: { type: Number, required: true },
        loanPeriod: { type: Number, required: true },
        guarantors: [
          {
            name: { type: String, required: true },
            cnic: { type: String, required: true },
            email: { type: String, required: true },
          },
        ],
        status: { type: String, default: 'Pending' }, // Loan status
        tokenNumber: { type: String },
        appointmentDetails: {
          date: { type: Date },
          time: { type: String },
          location: { type: String },
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
