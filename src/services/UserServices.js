import { axiosInstance } from "../utils/Interceptor";
const UserService = {};

UserService.getUserInfo = async function () {
  let result = await axiosInstance.get("user/user-info");
  return result.data;
};

UserService.refreshToken = async function (data) {
  return await axiosInstance.post("user/refresh-token", data);
};

UserService.isValid = async function (params) {
  let url = "user/isValid";
  if (params != "") {
    url += "?" + params;
  }
  let result = await axiosInstance.get(url);
  return result.data;
};

// Add the collaborator
UserService.addCollaborator = async function (data) {
  let result = await axiosInstance.post("/user/collaborators", data);
  return result.data;
};

// Send initation link again to collaborator
UserService.sendCollaboratorInvitation = async function (data) {
  let result = await axiosInstance.post(
    "/user/collaborator/activation-link",
    data
  );
  return result.data;
};

// Login user by admin
UserService.getAllUsers = async function (data) {
  let result = await axiosInstance.post("/user/get-all-users", data);
  return result.data;
};

// Login user by admin
UserService.loginAs = async function (data) {
  let result = await axiosInstance.post("/user/login-as", data);
  return result.data;
};

// Login user by admin
UserService.backToAdmin = async function (data) {
  let result = await axiosInstance.post("/user/back-to-admin", data);
  return result.data;
};
export default UserService;
