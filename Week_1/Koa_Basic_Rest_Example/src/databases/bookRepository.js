import { ReadData, WriteDataToFile } from "../utils/file.js";

const books = [
  { id: 101, name: "Fight Club", author: "Chuck Palahniuk" },
  { id: 102, name: "Sharp Objects", author: "Gillian Flynn" },
  { id: 103, name: "Frankenstein", author: "Mary Shelley" },
  { id: 104, name: "Into The Willd", author: "Jon Krakauer" },
];

/**
 *
 * @returns {[{author: string, name: string, id: number}, {author: string, name: string, id: number}, {author: string, name: string, id: number}, {author: string, name: string, id: number}]}
 */
async function getAll() {
  return await ReadData("src/databases/book.json");
}

/**
 *
 * @param id
 * @returns {{author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number}}
 */
async function getOne(id) {
  const books = await ReadData("src/databases/book.json");

  return books.find((book) => book.id === parseInt(id));
}

/**
 *
 * @param data
 */
async function add(data) {
  const updatedBooks = [data, ...books];
  return await WriteDataToFile("src/databases/book.json", updatedBooks);
}

export { getAll, getOne, add };
