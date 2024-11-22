import React, { useEffect } from "react";
import Image from "../../../assets/On-Que-Logo_Dark_RGB.svg";
import { Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { toastrError, toastrSuccess } from "../../../utils";

const ORIGIN_URL = import.meta.env.VITE_ORIGIN_URL;

const VerifyEmail = () => {
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const userId = url.searchParams.get("userId");
  const token = url.searchParams.get("token");

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/verify-account?token=${token}&userId=${userId}`,
      );
      if (response.status === 200) {
        toastrSuccess(response?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      const message = error.response?.message || "Email is already verified";
      toastrError(message);
    }
  };
  console.log("Working")
  useEffect(() => {
    console.log(token, "Token")
    if (!token) {
      navigate("/404");
    }
  }, [token, navigate]);

  return (
    <div>
      <main className="items-center justify-center w-full flex-1 text-center bg-gray-100 h-full">
        <div className="bg-white shadow-2xl flex flex-row h-[50rem]">
          <div className="flex justify-center w-full mt-20">
            <div className="w-96">
              <div className="flex justify-center">
                <img src={Image} alt="icon" width={200} height={10} />
              </div>
              <div className="mt-9">
                <Typography variant="h5">Verify Your Email</Typography>
                <Typography variant="h6" className="mt-6 text-gray-500">
                  Please click the button below to verify your email address.
                </Typography>
                <div className="flex justify-center w-full mt-5">
                  <Button className="w-40" onClick={handleVerifyEmail}>
                    Verify Email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyEmail;