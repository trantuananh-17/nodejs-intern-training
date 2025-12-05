import { postController } from "./controllers/post.controller.js";
import { userController } from "./controllers/user.controller.js";
import { postService } from "./services/post.service.js";

//Câu 2: Lấy danh sách users
// const user = await userController.getAllUsers();
// console.log(user);

//Câu 3: Lấy tất cả user và thông tin posts, comments
// const users = await userController.getUsersWithPostsAndComments();
// console.log(JSON.stringify(users[0], null, 2));

// Câu 4: Lấy user có số lượng comment lớn hơn 3
// const users = await userController.getUserMoreThan3Comment();
// console.log(JSON.stringify(users, null, 2));

// Câu 5: Lấy danh sách user và format lại tổng posts, comments
// const users = await userController.refactorCountOfCommentsAndPosts();
// console.log(JSON.stringify(users, null, 2));

// Câu 6.1: Lấy user có post lớn nhất
// const users = await userController.getUserWithTheMostPost();
// console.log(JSON.stringify(users, null, 2));

// Câu 6.2: Lấy user có comment lớn nhất
// const users = await userController.getUserWithTheMostComment();
// console.log(JSON.stringify(users, null, 2));

// Câu 7
// const users = await userController.getListUserSortByPostCounDesc();
// console.log(JSON.stringify(users, null, 2));

// Câu 8: lấy bài post số 1 + merge comment của bài có id 1
const post = await postController.getPostWithComments(1);
console.log(JSON.stringify(post, null, 2));
