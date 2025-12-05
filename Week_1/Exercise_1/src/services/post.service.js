import urlPath from "../utils/data.js";
import fetchData from "../utils/fetchData.js";

async function getPosts() {
  return fetchData(urlPath.posts);
}

async function getPostById(postId) {
  return fetchData(`${urlPath.posts}/${postId}`);
}

async function getPostInfoById(postId) {
  const [post, comments] = await Promise.all([
    fetchData(`${urlPath.posts}/${postId}`),
    fetchData(`${urlPath.comments}?postId=${postId}`),
  ]);

  return { ...post, comments };
}

export const postService = {
  getPosts,
  getPostById,
  getPostInfoById,
};
