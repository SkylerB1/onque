import { axiosInstance } from "../utils/Interceptor";
const BrandService = {};

BrandService.getUserBrandsList = async function () {
  return await axiosInstance.get("brands");
};
export default BrandService;
