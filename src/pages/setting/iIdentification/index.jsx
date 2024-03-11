;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import CustomModal from "../../../components/modal/customModal";
import axios from "axios";

const Identification = () => {
  const navigate = useNavigate
();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [message, setMessage] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setError(""); 
    } else {
      setError("Passwords do not match");
    }
    e.preventDefault();

    if (password === confirmPassword) {
      setError("");
      const data = {
        email: email,
        password: password,
      };

      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/user/forgot-password`,
          data,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response.data.msg);
        if (response.status === 200) {
          setMessage(response.data.msg);
          handleOpen();
        } else {
          console.error("Error sending data to the backend");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setError("Passwords do not match");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-gray-100 min-h-screen">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-row w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="flex items-center justify-center">
              <div className="bg-white rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">
                  Reset your password
                </h2>
                <form className="text-left" onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="w-full p-2 border rounded mt-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2"
                      >
                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        className="w-full p-2 border rounded mt-1"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2"
                      >
                        {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </button>
                    </div>
                  </div>
                  <div className="text-red-500 mb-4">{error}</div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="w-2/5 bg-gray-200 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <img
              src="/assets/On-Que-Logo_Dark_RGB.svg?react" // Path relative to the "public" directory
              alt="On Que Logo"
              width={1172}
              height={564}
            />
          </div>
        </div>
      </main>

      <CustomModal open={open} handleClose={handleClose} title={message} />
    </>
  );
};

export default Identification;
