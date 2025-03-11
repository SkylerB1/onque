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

PostsService.getTiktokPostStatus = async function (
  brandId,
  post_id,
  platformName,
  publish_id
) {
  let data = {
    post_id,
    platformName,
    publish_id,
  };
  const response = await axiosInstance.post(
    `/user/tiktok/post-status?brandId=${brandId}`,
    data
  );
  return response.data;
};

export default PostsService;
