import { axiosInstance } from "../utils/Interceptor";
const UserService = {};

UserService.getUserInfo = async function () {
  return await axiosInstance.get("user/user-info");
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
export default UserService;
