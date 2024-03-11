import axios from "axios";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FaFacebookF } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../utils/notificatuon";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { AppLogo, LOGIN_SIDE_IMG } from "../../../components/common/Images";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  RegisterFailed,
  RegisterSuccessful,
} from "../../../components/common/commonString";
import { Input, Button } from "@material-tailwind/react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import LoadingButton from "../../../components/button/LoadingButton";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        data
      );
      if (response.status === 200) {
        const data = {
          brand_name: "",
        };

        setLoading(false);
        await axios.post(
          `${import.meta.env.VITE_API_URL}/brands/create`,
          { data: data },
          {
            headers: { authorization: `Bearer ${response.data.token}` },
          }
        );

        showSuccessMessage(RegisterSuccessful);
        navigate("/login");
      } else {
        showErrorMessage(RegisterFailed);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        const message = error.response.data.message; // Show error toast
        showErrorMessage(message);
      } else {
        const message = error.response.data.message; // Show error toast
        showErrorMessage(message);
      }
    }
  };

  const loginWithFacebook = async (response) => {
    const result = await axios
      .post(`${import.meta.env.VITE_API_URL}/auth/facebook`, {
        data: { accessToken: response.accessToken, userID: response.userID },
      })
      .then((response) => {
        console.log("Facebook login seccessfully", response);
      });

    if (result.data.status === 200) {
      localStorage.setItem("token", result.data.token);
      navigate("/");
    }
  };

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <main className="fitems-center justify-center flex-1 text-center bg-gray-100 h-full">
        <div className="bg-white shadow-2xl 2xl:flex md:flex md:grid-flow-col flex-row h-[61rem]">
          <div
            className="2xl:w-3/6 2xl:p-5 lg:w-3/6 md:w-3/6"
            style={{
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
            <div className="flex items-center justify-center 2xl:w-full lg:w-full md:w-[10rem]">
              <div className="bg-white rounded-lg w-[30rem]">
                <div className="flex items-start justify-start mb-10 mt-28">
                  <h4 className="text-3xl font-semibold w-full">
                    Get Started with OnQue
                  </h4>
                </div>
                <div className="flex items-start justify-start w-full">
                  <form onSubmit={handleSubmit(onSubmit)} className="w-[30rem]">
                    <div className="2xl:flex lg:flex md:grid-flow-col flex-1 justify-between w-[30rem] gap-6">
                      <div className="mb-4 w-full">
                        <Input
                          type="text"
                          {...register("firstName", { required: true })}
                          placeholder="First Name"
                          label="First Name"
                          className="focus:shadow-none"
                          size="regular"

                        />
                      </div>
                      <div className="mb-4  w-full">
                        <Input
                          type="text"
                          {...register("lastName", { required: true })}
                          placeholder="Last Name"
                          label="Last Name"
                          className="focus:shadow-none"
                          size="regular"

                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <Input
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="Email"
                        className="focus:shadow-none"
                        label="Email"
                        size="regular"

                      />
                    </div>
                    <div className="mb-4">
                      <div className="mb-4 relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...register("password", { required: true })}
                          placeholder="Password"
                          label="Password"
                          size="regular"
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
                    </div>
                    <div className="flex flex-1 justify-between">
                      <div className="w-full relative flex mb-3">
                        <Link
                          className="text-gray-500 font-semibold hover:text-blue-500"
                          to="/login"
                        >
                          Do you have an account?
                        </Link>
                      </div>
                    </div>
                    <div className="mb-8">
                      <LoadingButton
                        loading={loading}
                        type="submit"
                        title={"Register"}
                      />
                    </div>
                  </form>
                </div>
                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                  <div className="absolute px-5 bg-white">Or</div>
                </div>
                <div className="flex mt-4 items-center justify-center gap-x-2 pt-6">
                  <FacebookLogin
                    appId={import.meta.env.VITE_FACEBOOK_APP_ID}
                    onSuccess={loginWithFacebook}
                    onFail={(err) => console.log(err)}
                    scope="pages_show_list,public_profile,instagram_content_publish,instagram_basic,instagram_manage_comments,instagram_manage_insights,publish_video,read_insights"
                    render={({ onClick }) => (
                      <div
                        className="flex justify-between rounded-md"
                        onClick={onClick}
                        style={{ background: "#0265E1" }}
                      >
                        <span className="flex justify-between h-12 pl-3 pr-3 py-3 cursor-pointer bg-light-blue-600 text-white rounded hover:bg-blue-500">
                          <p>Continue with Facebook</p>
                          <FaFacebookF className="h-6 pl-2 py-1 text-xl text-white" />
                        </span>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="2xl:w-3/6 text-white py-36 px-12 lg:w-3/6 md:w-3/6"
            style={{
              backgroundColor: "#A7C7ED",
              boxShadow:
                "rgba(0, 0, 0, 0.08) 20px 0px 21px -10px inset, rgb(8 8 8 / 29%) 13px 0px 21px -10px inset",
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
            <div className="items-start justify-start"></div>
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
    </>
  );
};

export default Register;
