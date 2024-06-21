import { axiosInstance } from "../utils/Interceptor";
const ConnectionService = {};

ConnectionService.getLinkedInPages = async function (brandId) {
  const response = await axiosInstance.get(
    `/auth/linkedin/pages?brandId=${brandId}`
  );
  return response.data;
};
export default ConnectionService;
