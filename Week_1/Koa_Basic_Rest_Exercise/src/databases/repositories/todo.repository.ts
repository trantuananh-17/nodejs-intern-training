import { todo } from 'node:test';
import { readData, writeDataToFile } from '../../helpers/file';
import { ICreateTodoDto, ITodoDto } from '../interfaces/todo.interface';

class TodoRepository {
  async createTodo(reqBody: ICreateTodoDto) {
    const todos = await readData('databases/todo.json');

    const todoId = todos.length > 0 ? todos.length + 1 : 1;
    const todo = { id: todoId, ...reqBody, isCompleted: false };

    const data = [todo, ...todos];
    await writeDataToFile(data, 'databases/todo.json');
    return todo;
  }

  async updateCompletedTodo(todoId: number, isCompleted: boolean) {
    const todos = await readData('databases/todo.json');

    const index = todos.findIndex((t: ITodoDto) => t.id === todoId);
    if (index === -1) {
      throw new Error('Todo not found');
    }

    const updatedTodo = {
      ...todos[index],
      isCompleted
    };

    todos[index] = updatedTodo;

    await writeDataToFile(todos, 'databases/todo.json');
    return todos[index];
  }

  async deleteTodo(todoId: number) {
    const books = await readData('databases/todo.json');

    const book = books.filter((todo: ITodoDto) => todo.id !== todoId);

    await writeDataToFile(book, 'databases/todo.json');
  }

  async getTodos() {
    const todos = await readData('databases/todo.json');

    return todos;
  }
}

export const todoRepository = new TodoRepository();
