import React, { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { useCookies } from "react-cookie";
import { axiosInstance } from "./utils/Interceptor";

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["access_token"]);
  const access_token = cookies?.access_token;
  const memoizedToken = useMemo(() => access_token, [access_token])



  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/user/user-info`
      );
      const data = response?.data;
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [memoizedToken])

  useEffect(() => {
    const checkAuthentication = async () => {
      const user = localStorage.getItem("user");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["black"]}
      />
    </div>;
  }


  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;