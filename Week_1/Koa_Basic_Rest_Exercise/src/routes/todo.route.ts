import Router from 'koa-router';
import { todoController } from '../controllers/todo.controller';
import { createTodoSchema, updateTodoSchema } from '../databases/schemas/todo.schema';
import { validateInput } from '../middlewares/validateInput.middleware';

const todoRoute = new Router();

todoRoute.get('/todos', todoController.getTodos);
todoRoute.post('/todos', validateInput(createTodoSchema), todoController.createTodo);
todoRoute.put('/todos/:todoId', validateInput(updateTodoSchema), todoController.updateCompletedTodo);
todoRoute.delete('/todos/:todoId', todoController.deleteTodo);

export default todoRoute;
