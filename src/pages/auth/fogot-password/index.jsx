import React, { useEffect } from "react";
import Image from "../../../assets/On-Que-Logo_Dark_RGB.svg";
import { Typography, Input, Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
const ORIGIN_URL = import.meta.env.VITE_ORIGIN_URL;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const userId = url.searchParams.get("userId");
  const token = url.searchParams.get("token");

  const { register, handleSubmit } = useForm({
    defaultValues: {
      newPassword: "",
      userId: userId,
      forgotPasswordToken: token,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/reset-password`,
        data
      );
      if (response.status === 200) {
        navigate("/login");
        toast.success(response?.data?.msg);
      }
    } catch (error) {
      console.log(error);
      const message = error.response.data.msg || "An error occurred.";
      toast.error(message);
    }
  };

  const redirectToLogin = () => {
    window.location.href = ORIGIN_URL + "/login";
  };

  useEffect(() => {
    if (!token) {
      navigate("/404");
    }
  }, [token]);

  return (
    <div>
      <main className="fitems-center justify-center w-full flex-1 text-center bg-gray-100 h-full">
        <div className="bg-white shadow-2xl flex flex-row  h-[50rem] ">
          <div className="flex justify-center w-full mt-20 ">
            <div className="w-96">
              <div className="flex justify-center">
                <img src={Image} alt="icon" width={200} height={10} />
              </div>
              <div className="mt-9">
                <Typography variant="h5">Password recovery</Typography>
                <Typography variant="h6" className="mt-6 text-gray-500">
                  Type the new password
                </Typography>
                <div className="mt-4">
                  <Input
                    type="password"
                    {...register("newPassword", { required: true })}
                    placeholder="New password"
                    label="New password"
                    className="focus:shadow-none"
                    size="md"
                  />
                </div>
                <div className="flex justify-center w-full mt-5 gap-3 ">
                  <Button
                    className="w-40"
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Let's go!
                  </Button>
                  <Button className="w-40 bg-none" onClick={redirectToLogin}>
                    Cancel
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

export default ForgotPassword;
