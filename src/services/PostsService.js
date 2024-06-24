import { axiosInstance } from "../utils/Interceptor";
const PostsService = {};

PostsService.createPost = async function (brandId, data) {
  const response = await axiosInstance.post(
    `/user/scheduler/posts?brandId=${brandId}`,
    data
  );
  return response;
};
export default PostsService;
