import { commentService } from "../services/comment.service.js";
import { postService } from "../services/post.service.js";

async function getPostWithComments(postId) {
  const [post, comments] = await Promise.all([
    postService.getPostById(postId),
    commentService.getCommentsByPostId(postId),
  ]);

  return {
    ...post,
    comments,
  };
}

export const postController = {
  getPostWithComments,
};
