// import EmailList from "./components/EmailList.jsx";
// import Navbar from "./components/Navbar.jsx";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import API from "./utils/api.js";
import { loginFailure, loginSuccess } from "./redux/Slices/auth.js";
import LandingPage from "./pages/landingPage/index.jsx";
import LoanDetail from "./pages/LoanDetail/index.jsx";

function App() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, userData } = useSelector((state)=>state.auth)
    

  // On App Load (Check if user is logged in)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token and fetch user details if necessary
      API.get("/auth/me")
        .then((response) => dispatch(loginSuccess(response.data.data)))
        .catch((error) => {
          dispatch(loginFailure(error));
          localStorage.removeItem("token");
        });
    }
  }, []);
  const light = useSelector((state) => state.themeReducer.light);
  return (
    <div className={light ? "" : "dark" }>

      {/* Dynamic Routes */}
      <BrowserRouter>
      
        <Routes>
          <Route index element={<LandingPage />} />  
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<SignUpPage />} />
          <Route path="/loan" element={<LoanDetail />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
