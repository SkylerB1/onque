import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../redux/features/brandsSlice";
import { useCookies } from "react-cookie";
import { useAppContext } from "../../context/AuthContext";
import useConnections from "./useConnections";
import { toastrError } from "../../utils";
import { axiosInstance } from "../../utils/Interceptor";
import { setUser } from "../../redux/features/userSlice";

const useUserInfo = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [cookies, setCookie] = useCookies(["access_token"]);
  const { getSubscriptions, getCounter } = useAppContext();
  const { getConnections } = useConnections();
  const user = useSelector((state) => state.user.value);

  const updateData = async (response) => {
    const { data: userData } = response;

    // const { access_token } = userData;
    // localStorage.setItem("access_token", access_token);
    // setCookie("access_token", access_token);

    let item = await dispatch(getBrands());
    let brand = user?.brand;
    const brandId = user?.brand?.id;
    if (brandId) {
      item.payload.brands.filter((brand) => brand.id == brandId);
    } else {
      brand = item.payload.brands[0];
    }

    const userBrand = {
      ...userData,
      brand: brand,
    };

    setUserData((prevData) => {
      if (JSON.stringify(prevData) !== JSON.stringify(userBrand)) {
        // console.log("new data");
        return userBrand;
      } else {
        // console.log("old data");
      }
      return prevData;
    });

    return userBrand;
  };

  const getUserRefreshedData = async () => {
    try {
      let token = localStorage.getItem("access_token");
      if (token == undefined) {
        return false;
      }
      localStorage.setItem("access_token", token);
      setCookie("access_token", token);

      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/user/refresh-token`,
        { isRefreshToken: false }
      );

      if (response.status === 200) {
        let userInfo = await updateData(response);
        return userInfo;
      } else {
        const message = response.data.message;
        // console.log(message);
        toastrError(message);
        return false;
      }
    } catch (error) {
      // console.log(error);
      const message = error.response?.data?.message || "An error occurred.";
      toastrError(message);
      return false;
    }
  };

  useEffect(() => {
    if (userData !== null) {
      dispatch(setUser(userData));
    }
  }, [userData]);
  return { getUserRefreshedData };
};

export default useUserInfo;
