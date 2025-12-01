import { postService } from "./services/post.service.js";
import { userService } from "./services/user.service.js";

//Câu 2: Lấy danh sách users
// const user = await userService.getAllUsers();
// console.log(user);

//Câu 3: Lấy tất cả user và thông tin posts, comments
// const users = await userService.getAllUserWithPostComment();
// console.log(JSON.stringify(users, null, 2));

// Câu 4: Lấy user có số lượng comment lớn hơn 3
// const users = await userService.getUserMoreThan3Comment();
// console.log(JSON.stringify(users, null, 2));

// Câu 5: Lấy danh sách user và format lại tổng posts, comments
// const users = await userService.getUsersReformatPostComment();
// console.log(JSON.stringify(users, null, 2));

// Câu 6.1: Lấy user có post lớn nhất
// const users = await userService.getUserWithTheMostPost();
// console.log(JSON.stringify(users, null, 2));

// Câu 6.2: Lấy user có comment lớn nhất
const users = await userService.getUserWithTheMostComment();
console.log(JSON.stringify(users, null, 2));

// Câu 7
// const users = await userService.getListUserSortByPostCounDesc();
// console.log(JSON.stringify(users, null, 2));

// Câu 8
// const post = await postService.getPostInfoById(1);
// console.log(JSON.stringify(post, null, 2));
