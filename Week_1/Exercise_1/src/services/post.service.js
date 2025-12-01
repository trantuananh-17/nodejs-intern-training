import urlPath from "../utils/data.js";
import { commentService } from "./comment.service.js";

class PostService {
  async getAllPosts() {
    const data = await fetch(urlPath.posts);

    const posts = await data.json();
    return posts;
  }

  async getPostById(postId) {
    const data = await fetch(`${urlPath.posts}/${postId}`);

    const post = await data.json();
    return post;
  }

  async getPostInfoById(postId) {
    const [post, comments] = await Promise.all([
      this.getPostById(postId),
      commentService.getCommentsByPostId(postId),
    ]);

    return {
      ...post,
      comments: comments,
    };
  }
}

export const postService = new PostService();
