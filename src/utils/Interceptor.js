import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const getToken = () => {
  if (typeof window != "undefined") {
    const user = localStorage.getItem("user");
    if (user) {
      const { access_token } = JSON.parse(user);
      return access_token;
    }
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
  const accessToken = localStorage.getItem("access_token");
  req.headers.Authorization = `Bearer ${accessToken}`;

  // const refreshToken = localStorage.getItem("refreshToken");

  return req;

  // const user = jwt_decode(accessToken);
  // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  // if (!isExpired) return req;
  // try {
  //   const response = await axios.get(
  //     import.meta.env.VITE_API_URL + "user/refreshToken",
  //     {
  //       headers: {
  //         refreshToken: refreshToken,
  //       },
  //     }
  //   );
  //   if (response.status === 200) {
  //     accessToken = response.data.accessToken;
  //     localStorage.setItem("accessToken", accessToken);
  //     req.headers.Authorization = `Bearer ${accessToken}`;
  //   }

  //   return req;
  // } catch (error) {
  //   if (error?.response.status === 401) {
  //     toast.error("Session expired");
  //   }
  // }
});
