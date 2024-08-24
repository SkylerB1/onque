import { axiosInstance } from "../utils/Interceptor";
const BrandService = {};

BrandService.getUserBrandsList = async function () {
  return await axiosInstance.get("brands");
};

BrandService.getMyBrandsList = async function () {
  return await axiosInstance.get("brands/getBrandsForSubscriptionChange");
};
export default BrandService;
