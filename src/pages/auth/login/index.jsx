import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FaFacebookF } from "react-icons/fa";
import ForgotPassword from "../modal";
import { ToastContainer } from "react-toastify";
import { Toaster, toast } from "react-hot-toast";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../utils/notificatuon";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { AppLogo, LOGIN_SIDE_IMG } from "../../../components/common/Images";
import LoadingButton from "../../../components/button/LoadingButton";
import { Input, Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Twitter from "../../../components/svg/Twitter";
import FacebookFilled from "../../../components/svg/FacebookFilled";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/userSlice";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useCookies } from "react-cookie";

const twitterImg = "/assets/twitters.svg?react";

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [cookies,setCookie] = useCookies(["access_token"])
  const [showPassword, setShowPassword] = useState(false);

  const user = localStorage.getItem("user");
  if (user) {
    return <Navigate to="/planner/calendar" />;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        data
      );
      if (response.status === 200) {
        const { data } = response;
        localStorage.setItem("user", JSON.stringify(data));
        setCookie('access_token',data?.access_token) 
        dispatch(setUser(data));
        setLoading(false);
        navigate("/planner/calendar");
        toast.success(`Welcome ${data.firstName}  ${data.lastName}`);
      } else {
        const message = response.data.message;
        toast.success(message);
      }
    } catch (error) {
      setLoading(false);
      const message = error.response.data.message || "An error occurred.";
      toast.success(message);
    }
  };


  const handleFacebookLogin = () => {
    try {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/facebook/login`;
    } catch (err) {
      console.log(err);
    }
  }

  const handleTwitterLogin = () => {
    try {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/twitter/login`;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <main className="fitems-center justify-center w-full flex-1 text-center bg-gray-100 h-full">
          <div className="bg-white shadow-2xl flex flex-row  h-[61rem] ">
            <div
              className="w-3/6 p-5"
              style={{
                height: "60rem",
                boxShadow:
                  "rgba(0, 0, 0, 0.08) -20px 0px 21px -10px inset, rgb(8 8 8 / 29%) -13px 0px 21px -10px inset",
              }}
            >
              <div className="flex items-start justify-start mt-5 ml-9">
                <img
                  src={AppLogo} // Path relative to the "public" directory
                  alt="On Que Logo"
                  width={90}
                  height={90}
                />
              </div>
              <div className="flex items-center justify-center ml-9">
                <div className="bg-white rounded-lg">
                  <div className="flex items-start justify-start mb-10 mt-28">
                    <h4 className="text-3xl font-semibold">
                      Hi, Welcome Back!
                    </h4>
                  </div>
                  <div className="flex items-start justify-start">
                    <form
                      className="w-full text-left"
                      onSubmit={handleSubmit(handleLogin)}
                    >
                      <div className="mb-4 border-none">
                        <Input
                          type="email"
                          {...register("email", { required: true })}
                          placeholder="Email"
                          label="Email"
                          className="focus:shadow-none"
                          size="md"
                        />
                      </div>
                      <div className="mb-4">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...register("password", { required: true })}
                          placeholder="Password"
                          label="Password"
                          size="regular"
                          fullWidth
                          className="focus:shadow-none"
                          icon={
                            <div
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={togglePasswordVisibility}
                            >
                              <div className="cursor-pointer">
                                {showPassword ? (
                                  <RiEyeFill />
                                ) : (
                                  <RiEyeOffFill />
                                )}
                              </div>
                            </div>
                          }
                        />
                      </div>
                      <div className="flex flex-1 justify-between">
                        <div className=" w-3/6 relative flex">
                          <p>
                            <Link
                              className="text-gray-500 font-semibold hover:text-blue-500"
                              to="/register"
                            >
                              <p>Don&apos;t have an account?</p>
                            </Link>
                          </p>
                        </div>
                        <div className="  w-3/6  mb-4 grid justify-items-stretch">
                          <div className="justify-self-end">
                            <p
                              className="text-gray-500 rounded hover:text-blue-500 justify-self-end cursor-pointer font-semibold"
                              onClick={handleOpen}
                            >
                              Forgot your Password?
                            </p>
                          </div>
                        </div>
                      </div>
                      <LoadingButton loading={loading} title={"Login"} />
                    </form>
                  </div>
                  <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                  </div>
                  <div className="flex mt-4 gap-x-2 pt-6 ">
                    <div
                      className="flex justify-between rounded-md"
                      style={{ background: "blue" }}
                      onClick={handleFacebookLogin}
                    >
                      <span className="flex items-center justify-between h-12 pl-3 pr-3 py-3 text-white cursor-pointer">
                        <p className="mr-2">Continue with Facebook</p>
                        <FacebookFilled width={18} height={18} fill={"#ffffff"} />
                      </span>
                    </div>
                    <div
                      className="flex justify-between rounded-md"
                      style={{ background: "#0F141A" }}
                      onClick={handleTwitterLogin}
                    >
                      <span className="flex items-center justify-between h-12 pl-3 pr-3 py-3 text-white cursor-pointer">
                        <p className="mr-2">Continue with Twitter</p>
                        <Twitter width={18} height={18} fill={"#ffffff"} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-3/6 text-white py-36 px-12"
              style={{
                backgroundColor: "#A7C7ED",
                // boxShadow:
                //   "rgba(0, 0, 0, 0.08) 20px 0px 21px -10px inset, rgb(8 8 8 / 29%) 13px 0px 21px -10px inset",
              }}
            >
              <div className="flex items-center justify-center mb-3">
                <p
                  className="bg-white text-base font-bold p-2 rounded-xl"
                  style={{ color: "#A7C7ED" }}
                >
                  Get Ready For Your Social Fame! 🤳🚀
                </p>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={LOGIN_SIDE_IMG}
                  alt="social"
                  width={602}
                  height={500}
                  style={{ backgroundimg: "none" }}
                />
              </div>
            </div>
          </div>
        </main>
        <ForgotPassword
          open={open}
          Close={handleClose}
          showSuccessMessage={showSuccessMessage}
          showErrorMessage={showErrorMessage}
        />
      </div>
    </>
  );
};

export default Login;
