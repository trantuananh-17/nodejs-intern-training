import urlPath from "../utils/data.js";

class CommentService {
  async getAllComments() {
    const data = await fetch(urlPath.comments);

    const comments = await data.json();
    return comments;
  }

  async getCommentsByPostId(postId) {
    console.log(`${urlPath.comments}?postId=${postId}`);

    const data = await fetch(`${urlPath.comments}?postId=${postId}`);

    const comments = await data.json();

    return comments;
  }
}

export const commentService = new CommentService();
