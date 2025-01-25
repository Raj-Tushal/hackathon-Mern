import React, { useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  signupFailure,
  signupStart,
  signupSuccess,
} from "../../redux/Slices/auth";
import toast from "react-hot-toast";

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, userData } = useSelector((state) => state.auth);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // onRegisterHandler
  const onRegisterHandler = async (e) => {
    e.preventDefault();
    dispatch(signupStart);
    if (!userName || !email || !password) return toast.error("Please fill all fields");
    try {
      const res = await API.post("/auth/register", { userName, email, password, });
      dispatch(signupSuccess(res.data));
      toast.success("Signup successful!");
      navigate("/login")
    } catch (error) {
      if (error.name === "AxiosError") {
        dispatch(signupFailure(error.response.data))
       toast.error(error.response.data.message);
        return
      }
      dispatch(signupFailure(error))
      toast.error("Signup failed!");
    }
  };

  return (
    <div className="dark:bg-[#121212] py-10">
      <form className="max-w-sm mx-auto dark:bg-[#1E1E1E] p-5 rounded-xl">
        {/* email */}
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter your username"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        {/* email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>

        {/* password */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        {/* submitbtn*/}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onRegisterHandler}
        >
          Register new account
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
