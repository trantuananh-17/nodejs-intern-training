import urlPath from "../utils/data.js";
import fetchData from "../utils/fetchData.js";

async function getComments() {
  return await fetchData(urlPath.comments);
}

async function getCommentsByPostId(postId) {
  return await fetchData(`${urlPath.comments}?postId=${postId}`);
}

export const commentService = {
  getComments,
  getCommentsByPostId,
};
