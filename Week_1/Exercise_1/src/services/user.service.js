import urlPath from "../utils/data.js";
import { commentService } from "./comment.service.js";
import { postService } from "./post.service.js";

class UserService {
  async getAllUsers() {
    const data = await fetch(urlPath.users);

    const users = await data.json();
    return users;
  }

  async getAllUserWithPostComment() {
    const [users, comments, posts] = await Promise.all([
      this.getAllUsers(),
      commentService.getAllComments(),
      postService.getAllPosts(),
    ]);

    const postsWithComments = posts.map((post) => ({
      posts: { ...post },
      comments: comments.filter((cmt) => cmt.postId === post.id),
    }));
    // console.log(JSON.stringify(postsWithComments, null, 2));

    const data = users.map((user) => {
      const userPosts = postsWithComments.filter(
        (postComment) => postComment.posts.userId === user.id
      );

      // console.log(JSON.stringify(userPosts, null, 2));

      const allComments = [];
      userPosts.forEach((p) => {
        allComments.push(...p.comments);
      });

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        posts: userPosts.map((p) => p.posts),
        comments: allComments,
      };
    });

    return data;
  }

  async getUserMoreThan3Comment() {
    const res = await this.getAllUserWithPostComment();

    const data = res.filter((user) => user.comments.length > 3);

    return data;
  }

  async getUsersReformatPostComment() {
    const res = await this.getAllUserWithPostComment();

    const data = res.map((user) => {
      const postsCount = user.posts.length;
      const commentsCount = user.comments.length;

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        postsCount,
        commentsCount,
      };
    });

    return data;
  }

  async getListUserSortByPostCounDesc() {
    const res = await this.getUsersReformatPostComment();

    const data = res.sort((a, b) => b.postsCount - a.postsCount);

    return data;
  }

  async getListUserSortByCommentCounDesc() {
    const res = await this.getUsersReformatPostComment();

    const data = res.sort((a, b) => b.commentsCount - a.commentsCount);

    return data;
  }

  async getUserWithTheMostPost() {
    const res = await this.getListUserSortByPostCounDesc();

    const data = res[0];

    return data;
  }

  async getUserWithTheMostComment() {
    const res = await this.getListUserSortByCommentCounDesc();

    const data = res[0];

    return data;
  }

  async getUserById(userId) {
    const data = await fetch(`${urlPath.users}/${userId}`);

    const user = await data.json();
    return user;
  }
}

export const userService = new UserService();
