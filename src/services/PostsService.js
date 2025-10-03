import { axiosInstance } from "../utils/Interceptor";
const PostsService = {};

PostsService.createPost = async function (brandId, data) {
  const response = await axiosInstance.post(
    `/user/scheduler/posts?brandId=${brandId}`,
    data
  );
  return response;
};

PostsService.getPostInsights = async function (postId) {
  let data = { postId };
  const response = await axiosInstance.post(`/user/get-post-insights`, data);
  return response.data;
};

PostsService.getPostData = async function (brandId) {
  let url = `user/getPostData/${brandId}`;
  const response = await axiosInstance.get(url);
  return response;
};

PostsService.fetchPostData = async function (brandId, postStatuses = null) {
  let url = `user/fetchPostData/${brandId}`;
  let data = {};
  if (postStatuses !== null) {
    data.postStatuses = postStatuses;
  }

  const response = await axiosInstance.post(url, data);
  return response;
};

PostsService.getInstagramFeed = async function (brandId) {
  const response = await axiosInstance.get(
    `auth/instagram/feed?brandId=${brandId}`
  );
  return response.data;
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
