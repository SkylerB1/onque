import { axiosInstance } from "../utils/Interceptor";
const UserService = {};

UserService.getUserInfo = async function () {
  return await axiosInstance.get("user/user-info");
};
export default UserService;
