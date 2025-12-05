import { commentService } from "../services/comment.service.js";
import { postService } from "../services/post.service.js";
import { userService } from "../services/user.service.js";

async function getAllUsers() {
  const users = await userService.getAllUsers();

  return users;
}

async function getUsersWithPostsAndComments() {
  const [users, posts, comments] = await Promise.all([
    userService.getAllUsers(),
    postService.getPosts(),
    commentService.getComments(),
  ]);

  const postsWithComments = await getPostsWithComments(posts, comments);

  const usersMerged = await mergeUsersWithPostsComment(
    users,
    postsWithComments
  );

  return usersMerged;
}

async function getUsersWithCommentsMoreThan3() {
  const usersMerged = await getUsersWithPostsAndComments();

  return usersMerged.filter((user) => user.comments.length > 3);
}

async function refactorCountOfCommentsAndPosts() {
  const usersMerged = await getUsersWithPostsAndComments();

  return usersMerged.map((user) => {
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
}

async function getUserTheMostComments() {
  const usersMerged = await refactorCountOfCommentsAndPosts();

  return await usersMerged.reduce((max, user) =>
    user.commentsCount > max.commentsCount ? user : max
  );
}

async function getUserTheMostPosts() {
  const usersMerged = await refactorCountOfCommentsAndPosts();

  return await usersMerged.reduce((max, user) =>
    user.postsCount > max.postsCount ? user : max
  );
}

async function getUsersSortByPosts() {
  const usersMerged = await refactorCountOfCommentsAndPosts();

  return await usersMerged.sort((a, b) => b.postsCount - a.postsCount);
}

export const userController = {
  getAllUsers,
  getUsersWithPostsAndComments,
  getUsersWithCommentsMoreThan3,
  refactorCountOfCommentsAndPosts,
  getUserTheMostComments,
  getUserTheMostPosts,
  getUsersSortByPosts,
};

async function mergeUsersWithPostsComment(users, postsWithComments) {
  return users.map((user) => {
    const userPosts = postsWithComments.filter(
      (postComment) => postComment.posts.userId === user.id
    );

    const commentsOfUsers = [];
    userPosts.forEach((p) => {
      commentsOfUsers.push(...p.comments);
    });

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      posts: userPosts.map((p) => p.posts),
      comments: commentsOfUsers,
    };
  });
}

async function getPostsWithComments(posts, comments) {
  return posts.map((post) => ({
    posts: { ...post },
    comments: comments.filter((comment) => comment.postId === post.id),
  }));
}
