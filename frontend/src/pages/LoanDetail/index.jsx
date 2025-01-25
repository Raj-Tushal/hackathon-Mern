import React, { useState } from "react";

const LoanDetail = () => {
  const [guarantor1, setGuarantor1] = useState({ name: "", email: "", location: "", cnic: "" });
  const [guarantor2, setGuarantor2] = useState({ name: "", email: "", location: "", cnic: "" });
  const [personalInfo, setPersonalInfo] = useState({ address: "", phone: "" });
  const [statement, setStatement] = useState(null);  // For statement file
  const [salarySheet, setSalarySheet] = useState(null); // For salary sheet file

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);  // Set the selected file
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loanDetails = {
      guarantor1,
      guarantor2,
      personalInfo,
      statement,
      salarySheet,
    };
    console.log("Loan Request Details: ", loanDetails);
    // Here you would send the data to your backend or API
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Loan Request Details</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        {/* Guarantor 1 Details */}
        <div>
          <h3 className="text-xl font-semibold">Guarantor 1 Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="guarantor1Name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="guarantor1Name"
                value={guarantor1.name}
                onChange={(e) => setGuarantor1({ ...guarantor1, name: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter Name"
              />
            </div>
            <div>
              <label htmlFor="guarantor1Email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="guarantor1Email"
                value={guarantor1.email}
                onChange={(e) => setGuarantor1({ ...guarantor1, email: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter Email"
              />
            </div>
            <div>
              <label htmlFor="guarantor1Location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                id="guarantor1Location"
                value={guarantor1.location}
                onChange={(e) => setGuarantor1({ ...guarantor1, location: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter Location"
              />
            </div>
            <div>
              <label htmlFor="guarantor1Cnic" className="block text-sm font-medium text-gray-700">CNIC</label>
              <input
                type="text"
                id="guarantor1Cnic"
                value={guarantor1.cnic}
                onChange={(e) => setGuarantor1({ ...guarantor1, cnic: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter CNIC"
              />
            </div>
          </div>
        </div>

        {/* Guarantor 2 Details */}
        <div>
          <h3 className="text-xl font-semibold">Guarantor 2 Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="guarantor2Name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="guarantor2Name"
                value={guarantor2.name}
                onChange={(e) => setGuarantor2({ ...guarantor2, name: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter Name"
              />
            </div>
            <div>
              <label htmlFor="guarantor2Email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="guarantor2Email"
                value={guarantor2.email}
                onChange={(e) => setGuarantor2({ ...guarantor2, email: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter Email"
              />
            </div>
            <div>
              <label htmlFor="guarantor2Location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                id="guarantor2Location"
                value={guarantor2.location}
                onChange={(e) => setGuarantor2({ ...guarantor2, location: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter Location"
              />
            </div>
            <div>
              <label htmlFor="guarantor2Cnic" className="block text-sm font-medium text-gray-700">CNIC</label>
              <input
                type="text"
                id="guarantor2Cnic"
                value={guarantor2.cnic}
                onChange={(e) => setGuarantor2({ ...guarantor2, cnic: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter CNIC"
              />
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div>
          <h3 className="text-xl font-semibold">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                value={personalInfo.address}
                onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter Address"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter Phone Number"
              />
            </div>
          </div>
        </div>

        {/* Optional Files Upload */}
        <div>
          <h3 className="text-xl font-semibold">Optional Documents</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="statement" className="block text-sm font-medium text-gray-700">Statement</label>
              <input
                type="file"
                id="statement"
                onChange={(e) => handleFileChange(e, setStatement)}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="salarySheet" className="block text-sm font-medium text-gray-700">Salary Sheet</label>
              <input
                type="file"
                id="salarySheet"
                onChange={(e) => handleFileChange(e, setSalarySheet)}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Loan Request
        </button>
      </form>
    </div>
  );
};

export default LoanDetail;
