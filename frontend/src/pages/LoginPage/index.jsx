import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate  } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "../../redux/Slices/auth";
import API from "../../utils/api";
import { signInWithGooglePopup } from "../../utils/firebase";
import { toast, Toaster } from 'react-hot-toast';

function LoginForm() {
  const dispatch = useDispatch();
  const { loading, error,isAuthenticated,userData } = useSelector((state) => state.auth);

  const [email,setEmail]  = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate()

// onsubmithandler
const onSubmitHandler = async () => {
  if(!email || !password) return toast.error("Please fill all fields");
  if(isAuthenticated) return toast.success("You are already logged in");
  try {
    const response = await API.post("/auth/login", { email, password });
    const token = response.data.token; // Assuming the API sends a JWT token

    // Save token to localStorage
    localStorage.setItem("token", token);

    // Redirect or update app state
    dispatch(loginSuccess(response.data.data));
    toast.success("Login successful!"); // Show success toast
  } catch (error) {
    dispatch(loginFailure(error));
    toast.error("Login failed!");
  }
};


 // Google login handler
 const handleGoogleLogin = async () => {
  dispatch(loginStart());
  try {
    const googleResponse = await signInWithGooglePopup();
    const { displayName, email, photoURL } = googleResponse.user;

    // Send Google user details to the backend
    const response = await API.post("/auth/google", {
      userName: displayName,
      email: email,
      profilePic: photoURL,
    });

    const token = response.data.token;

    // Save token to localStorage
    localStorage.setItem("token", token);

    // Dispatch success and navigate
    dispatch(loginSuccess(response.data.data));
    toast.success("Login successful!");
    // navigate("/dashboard");
  } catch (error) {
    dispatch(loginFailure(error || "Google login failed"));
  }
};

  return (
    <section className="bg-gray-50 dark:bg-[#121212]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <h1 className="text-4xl font-bold">Booking App</h1>
        </a>
        <div className="w-full bg-white dark:bg-[#1E1E1E] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50  border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required={true}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
               onClick={onSubmitHandler}>
                Sign in
              </button>
              <div className="px-6 sm:px-0 max-w-sm">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
                >
                  <svg
                    className="mr-2 -ml-1 w-4 h-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Sign up with Google<div></div>
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link to="/Register">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Sign up
                  </a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
