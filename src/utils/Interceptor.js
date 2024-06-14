import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { Toaster, toast } from "react-hot-toast";
import { Cookies } from "react-cookie";
import { toastrError } from ".";
import Swal from "sweetalert2";
import { store } from "../redux/store";

let ACCESS_TOKEN_KEY = "access_token";

export const getToken = () => {
  if (typeof window != "undefined") {
    // const user = localStorage.getItem("user");
    // const user = localStorage.getItem("user");
    // if (user) {
    //   const { access_token } = JSON.parse(user);
    //   return access_token;
    // }
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    return accessToken;
  }
};

// export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    authorization: `Bearer ${getToken()}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  req.headers.Authorization = `Bearer ${accessToken}`;

  const user = jwt_decode(accessToken);
  let isExpired = false;

  // Checking the day difference to refresh the token
  const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
  const tokenExpirationTime = user.exp;
  const timestampDifference = tokenExpirationTime - currentTimestampInSeconds;

  if (timestampDifference <= 0) isExpired = true;
  let daysDifference = Math.floor(timestampDifference / (60 * 60 * 24));
  // console.log(timestampDifference, daysDifference);
  if (daysDifference < 1) {
    isExpired = true;
  }

  if (!isExpired) return req;
  try {
    let headers = {
      authorization: `Bearer ${getToken()}`,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/refresh-token`,
      {},
      {
        headers: headers,
      }
    );

    if (response.status === 200) {
      accessToken = response.data.access_token;

      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  } catch (error) {
    console.log(error);
    if (error?.response?.status === 401) {
      toastrError("Session expired");
    }
  }
  return req;
});

// API respone interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // return response.data;
    return response;
  },
  (error) => {
    console.log(error);
    let status = error?.response?.status;
    if (status == 401) {
      Swal.fire({
        title: "Session expired",
        html: "Please login again.",
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#ff6b72",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          location.reload();
        }
      });
    } else if (status === 404) {
      toastrError("Not Found");
    } else if (status == 500) {
      toastrError("Internal Server Error");
    } else if (status == 508) {
      toastrError("Time Out");
    } else {
      return Promise.reject(error);
    }
  }
);
