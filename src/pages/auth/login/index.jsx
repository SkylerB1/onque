import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import ForgotPassword from "../modal";
import { toast } from "react-hot-toast";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../utils/notificatuon";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { AppLogo, LOGIN_SIDE_IMG } from "../../../components/common/Images";
import LoadingButton from "../../../components/button/LoadingButton";
import { Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Twitter from "../../../components/svg/Twitter";
import FacebookFilled from "../../../components/svg/FacebookFilled";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/userSlice";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useCookies } from "react-cookie";
import { getBrands } from "../../../redux/features/brandsSlice";
import useConnections from "../../../components/customHooks/useConnections";
import { useAppContext } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../utils/Interceptor";
import { toastrError, toastrSuccess } from "../../../utils";
import InputEmailForSocialMeadia from "../modal/inputEmailForSocialMeadia";

const Login = () => {
  const { socialMedia, token } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openInputEmailForSML, setOpenInputEmailForSML] = useState(false);
  const [loadingInputEmailForSM, setLoadingInputEmailForSM] = useState(false);

  const { getConnections } = useConnections();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { getSubscriptions, getCounter } = useAppContext();
  const [cookies, setCookie] = useCookies(["access_token"]);
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

  const handleInputEmailSMLClose = () => {
    setOpenInputEmailForSML(false);
  };
  const handleInputEmailSMLOpen = () => {
    setOpenInputEmailForSML(true);
  };

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        data
      );
      if (response.status === 200) {
        await handlePostLogin(response);
      } else {
        const message = response.data.message;
        toast.error(message);
      }
    } catch (error) {
      setLoading(false);
      const message = error.response.data.message || "An error occurred.";
      toast.error(message);
    }
  };

  const handlePostLogin = async (response) => {
    const { data: userData } = response;
    const { access_token } = userData;
    localStorage.setItem("access_token", access_token);
    setCookie("access_token", access_token);
    dispatch(getBrands()).then((item) => {
      const brand = item.payload.brands[0];
      const userBrand = {
        ...userData,
        brand: brand,
      };
      console.log(brand);
      getCounter(brand.id);
      dispatch(setUser(userBrand));
      getConnections(brand.id);
    });
    getSubscriptions();
    setLoading(false);
    navigate("/planner/calendar");
  };
  // Ths function is used to refresh the token when facebook login callback come
  const refreshToken = async (token) => {
    try {
      if (token == undefined) {
        return false;
      }
      localStorage.setItem("access_token", token);
      setCookie("access_token", token);

      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/user/refresh-token`
      );

      if (response.status === 200) {
        await handlePostLogin(response);
      } else {
        const message = response.data.message;
        toast.error(message);
      }
    } catch (error) {
      // console.log(error);
      const message = error.response.data.message || "An error occurred.";
      toast.error(message);
    }
  };
  const handleFacebookLogin = async () => {
    try {
      let redirectUrl = `${import.meta.env.VITE_API_URL}/auth/facebook/login`;
      window.location.href = redirectUrl;
    } catch (err) {
      console.log(err);
    }
  };

  const handleTwitterLogin = () => {
    try {
      window.location.href = `${
        import.meta.env.VITE_API_URL
      }/auth/twitter/login`;
    } catch (err) {
      console.log(err);
    }
  };
  const handleTwitterCallback = async () => {
    try {
      const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const response = await axiosInstance.post(
        `${
          import.meta.env.VITE_API_URL
        }/user/validate-token-for-login-with-twitter`
      );
      if (response.status == 200) {
        await handlePostLogin(response);
      } else {
        // open the email input popup
        handleInputEmailSMLOpen();
      }
    } catch (error) {
      // console.log(error);
      const message = error.response.data.message || "An error occurred.";
      toastrError(message);
      navigate("/login");
    }
  };
  const onSubmitEmailFortwitterLogin = async (data) => {
    try {
      setLoadingInputEmailForSM(true);
      const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const response = await axiosInstance.post(
        `${
          import.meta.env.VITE_API_URL
        }/user/save-email-for-login-with-twitter`,
        data
      );
      // reset();
      // console.log(response);

      if (response.status === 200) {
        setLoadingInputEmailForSM(false);
        handleInputEmailSMLClose();
        toastrSuccess(response?.data?.message);
        setTimeout(async () => {
          await handlePostLogin(response);
        }, 1500);
      } else {
        const message = response.data.message;
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      // reset();
      setLoadingInputEmailForSM(false);
      handleInputEmailSMLClose();
      const message = error.response.data.message || "An error occurred.";
      toastrError(message);
      navigate("/login");
    }
  };
  useEffect(() => {
    if (token != "" && socialMedia == "fb") {
      refreshToken(token);
    }
    if (token != "" && socialMedia == "x") {
      handleTwitterCallback(token);
    }
  }, [token]);

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
                        <FacebookFilled
                          width={18}
                          height={18}
                          fill={"#ffffff"}
                        />
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

        <InputEmailForSocialMeadia
          open={openInputEmailForSML}
          Close={handleInputEmailSMLClose}
          onSubmit={onSubmitEmailFortwitterLogin}
          loading={loadingInputEmailForSM}
        />
      </div>
    </>
  );
};

export default Login;
