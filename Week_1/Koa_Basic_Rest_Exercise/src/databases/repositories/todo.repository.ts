import { todo } from 'node:test';
import { readData, writeDataToFile } from '../../helpers/file';
import { ICreateTodoDto, ITodoDto } from '../interfaces/todo.interface';
import logger from '../../helpers/logger.helper';

class TodoRepository {
  async createTodo(reqBody: ICreateTodoDto) {
    const todos = await readData('databases/todo.json');

    const todoId = todos.length > 0 ? Math.floor(Math.random() * 1000000) : 1;
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
    const todos = await readData('databases/todo.json');

    const todo = todos.filter((todo: ITodoDto) => todo.id !== todoId);

    await writeDataToFile(todo, 'databases/todo.json');
  }

  async getTodos() {
    const todos = await readData('databases/todo.json');

    return todos;
  }

  async updateManyTodo(todoIds: number[], isCompleted: boolean) {
    const todos = await readData('databases/todo.json');

    const updatedTodos = todos.map((todo: ITodoDto) => {
      if (todoIds.includes(todo.id)) {
        return { ...todo, isCompleted };
      }
      return todo;
    });

    await writeDataToFile(updatedTodos, 'databases/todo.json');
    return updatedTodos;
  }

  async deleteManyTodo(todoIds: number[]) {
    const todos = await readData('databases/todo.json');

    const newTodos = todos.filter((todo: ITodoDto) => !todoIds.includes(todo.id));

    await writeDataToFile(newTodos, 'databases/todo.json');
  }
}

export const todoRepository = new TodoRepository();
