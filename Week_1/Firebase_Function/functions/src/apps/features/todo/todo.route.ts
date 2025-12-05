import Router from "koa-router";
import { todoController } from "./todo.controller";
import {
  createTodoSchema,
  deleteManySchema,
  updateManySchema,
  updateTodoSchema,
} from "./todo.schema";
import { validateInput } from "../../global/middlewares/validateInput.middleware";

const todoRoute = new Router();

todoRoute.get("/todos", todoController.getTodos);
todoRoute.post(
  "/todos",
  validateInput(createTodoSchema),
  todoController.createTodo
);
todoRoute.put(
  "/todos/update-many",
  validateInput(updateManySchema),
  todoController.updateManyTodo
);
todoRoute.put(
  "/todos/:todoId",
  validateInput(updateTodoSchema),
  todoController.updateCompletedTodo
);
todoRoute.delete(
  "/todos/delete-many",
  validateInput(deleteManySchema),
  todoController.deleteManyTodo
);
todoRoute.delete("/todos/:todoId", todoController.deleteTodo);

export default todoRoute;
