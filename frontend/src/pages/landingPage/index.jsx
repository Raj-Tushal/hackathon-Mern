import React, { useState } from "react";
import PopUp from "./PopUp";

const LandingPage = () => {
  // State to manage inputs and result
  const [loanType, setLoanType] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [repaymentPeriod, setRepaymentPeriod] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [open, setOpen] = useState(false);

  const handleProcced = () => {
     setOpen(true)
  }

  // Calculate button handler
  const handleCalculate = () => {
    // Validation: Ensure all fields are filled
    if (!loanType || !loanAmount || !repaymentPeriod) {
      alert("Please fill in all fields!");
      return;
    }

    // Loan calculation logic
    const interestRate = 0.10; // Assuming a fixed 10% interest rate
    const repaymentMonths = parseInt(repaymentPeriod) * 12; // Convert years to months
    const totalAmount = parseFloat(loanAmount) * (1 + interestRate); // Total loan with interest
    const monthlyPayment = (totalAmount / repaymentMonths).toFixed(2); // Monthly payment

    // Update state with the result
    setMonthlyPayment(monthlyPayment);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Header Section */}
      <header className="bg-blue-600 w-full py-4 text-white text-center shadow-lg">
        <h1 className="text-3xl font-bold">Saylani Microfinance</h1>
        <p className="text-sm mt-2">Empowering Communities with Financial Solutions</p>
      </header>

      {/* Main Content Section */}
      <main className="mt-10 w-11/12 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Loan Categories */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Loan Categories</h2>
          <ul className="space-y-2">
            <li className="bg-blue-50 p-3 rounded-lg shadow-sm hover:bg-blue-100">
              Wedding Loans
            </li>
            <li className="bg-blue-50 p-3 rounded-lg shadow-sm hover:bg-blue-100">
              Home Construction Loans
            </li>
            <li className="bg-blue-50 p-3 rounded-lg shadow-sm hover:bg-blue-100">
              Business Startup Loans
            </li>
            <li className="bg-blue-50 p-3 rounded-lg shadow-sm hover:bg-blue-100">
              Education Loans
            </li>
          </ul>
        </div>

        {/* Loan Calculator */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Loan Calculator</h2>
          <form className="space-y-4">
            {/* Loan Type Selection */}
            <select
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setLoanType(e.target.value)}
            >
              <option value="">Select Loan Type</option>
              <option value="Wedding Loans">Wedding Loans</option>
              <option value="Home Construction Loans">Home Construction Loans</option>
              <option value="Business Startup Loans">Business Startup Loans</option>
              <option value="Education Loans">Education Loans</option>
            </select>

            {/* Loan Amount Input */}
            <input
              type="number"
              placeholder="Enter Amount"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setLoanAmount(e.target.value)}
            />

            {/* Loan Repayment Period Selection */}
            <select
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setRepaymentPeriod(e.target.value)}
            >
              <option value="">Select Repayment Period</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="5">5 years</option>
            </select>

            {/* Calculate Button */}
            <button
              type="button"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              onClick={handleCalculate}
            >
              Calculate
            </button>
          </form>

          {/* Display Monthly Payment */}
          {monthlyPayment && (
            <div className="mt-6 bg-green-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Calculation Result:</h3>
              <p>Your Monthly Payment: <span className="font-bold">{monthlyPayment} PKR</span></p>
              <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              onClick={handleProcced}>Procced</button>
            </div>
          )}
        </div>
      </main>

      {/* Footer Section */}
      <footer className="mt-10 py-4 bg-gray-800 text-white w-full text-center">
        <p>&copy; 2025 Saylani Microfinance. All rights reserved.</p>
      </footer>

      {open ? <PopUp setOpen={setOpen}/> : null}
    </div>
  );
};

export default LandingPage;
