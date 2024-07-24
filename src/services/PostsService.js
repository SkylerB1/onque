import { axiosInstance } from "../utils/Interceptor";
const PostsService = {};

PostsService.createPost = async function (brandId, data) {
  const response = await axiosInstance.post(
    `/user/scheduler/posts?brandId=${brandId}`,
    data
  );
  return response;
};

PostsService.getPostData = async function (brandId) {
  const response = await axiosInstance.get(`user/getPostData/${brandId}`);
  return response;
};
export default PostsService;
