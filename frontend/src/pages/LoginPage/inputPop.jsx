import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function inputPop({ setOpen }) {
  // State to store new password and confirm password values
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // You can replace this with your logic for submitting the new password (e.g., API call)
    console.log("New Password Submitted:", { newPassword });

    // After submission, close the popup (if needed)
    setOpen(false);
  };

  const onSubmit = () => {
    navigate("/loan");
    toast.success("Check your email to create a new password.", { position: "top-center", duration: 10000 });
  };

  return (
    <div className="fixed h-screen w-full top-0 left-0 z-[1000] bg-[#000000a1]">
      {/* Centered Popup Form */}
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          {/* Close button */}
          <button
            className="absolute top-2 right-2 text-xl text-gray-500"
            onClick={() => setOpen(false)}
          >
            x
          </button>

          <h2 className="text-xl font-semibold mb-4">Enter New Password</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter New Password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm New Password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              onClick={onSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default inputPop;
