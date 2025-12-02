import Router from "koa-router";
import { getBook, getAllBooks, save } from "../controllers/bookController.js";
import bookSchema from "../schemas/book.schema.js";
import validateResource from "../middlewares/validateResource.js";
// Prefix all routes with /books
const router = new Router({
  prefix: "/api",
});

const books = [
  { id: 101, name: "Fight Club", author: "Chuck Palahniuk" },
  { id: 102, name: "Sharp Objects", author: "Gillian Flynn" },
  { id: 103, name: "Frankenstein", author: "Mary Shelley" },
  { id: 104, name: "Into The Willd", author: "Jon Krakauer" },
];

router.get("/books", getAllBooks);
router.get("/books/:id", getBook);
router.post("/books", validateResource(bookSchema), save);

export default router;
