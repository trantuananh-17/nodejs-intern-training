import urlPath from "../utils/data.js";
import fetchData from "../utils/fetchData.js";

async function getAllUsers() {
  return await fetchData(urlPath.users);
}

async function getUserById(userId) {
  return await fetchData(`${urlPath.users}/${userId}`);
}

export const userService = {
  getAllUsers,
  getUserById,
};
