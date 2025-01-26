import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';
function PopUp({ setOpen }) {
  // State to store form input values
  const [cnic, setCnic] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with your logic for submitting the form (e.g., API call)
    console.log("Form submitted:", { cnic, email, name });

    // After submission, close the popup (if needed)
    setOpen(false);
  };

  const onSubmit = async()=>{

    try {
        const res = await API.post('/auth/proceed',{cnic,email,name})
        if(res.status){
            navigate("/login")
            toast.success("check your gmail",{position:"top-center"},{duration:5000});
        }else{
            toast.error(res.message);
        }
    } catch (error) {
        toast.error(error.message);
    }

  }

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

          <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cnic" className="block text-sm font-medium text-gray-700">CNIC</label>
              <input
                id="cnic"
                type="text"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter CNIC"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Email"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Name"
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

export default PopUp;
