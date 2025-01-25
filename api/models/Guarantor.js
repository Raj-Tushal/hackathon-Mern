const mongoose = require('mongoose');

const guarantorSchema = new mongoose.Schema({
  loanRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoanRequest',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true, // Relationship to the loan applicant
  },
  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Guarantor = mongoose.model('Guarantor', guarantorSchema);
module.exports = Guarantor;
