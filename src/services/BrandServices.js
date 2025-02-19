import { axiosInstance } from "../utils/Interceptor";
const BrandService = {};

BrandService.getUserBrandsList = async function () {
  return await axiosInstance.get("brands");
};

BrandService.getMyBrandsList = async function () {
  return await axiosInstance.get("brands/getMyBrands");
};
BrandService.getMyBrands = async function (status) {
  return await axiosInstance.get(`brands/getMyBrands?status=${status}`);
};
BrandService.updateBrands = async function (data) {
  const response = await axiosInstance.post(`brands/updateBrands`, data);
  return response;
};

export default BrandService;
