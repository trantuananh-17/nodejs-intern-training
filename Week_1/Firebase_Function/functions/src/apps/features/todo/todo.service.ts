import {
  BadRequestException,
  NotFoundException,
} from "../../global/utils/error.util";
import { ICreateTodoDto } from "./todo.interface";
import { todoRepository } from "./todo.repository";

async function getTodos() {
  return await todoRepository.getTodos();
}

async function createTodo(reqBody: ICreateTodoDto) {
  const todo = await todoRepository.createTodo(reqBody);

  if (!todo) {
    throw BadRequestException("Không thể tạo mới todo");
  }

  return todo;
}

async function updateCompletedTodo(
  todoId: string,
  isCompleted: boolean
): Promise<null> {
  await checkExistsTodo(todoId);

  const todo = await updateCompletedTodo(todoId, isCompleted);

  return todo;
}

async function deleteTodo(todoId: string) {
  await checkExistsTodo(todoId);

  await todoRepository.deleteTodo(todoId);
}

async function updateManyTodo(
  todoIds: string[],
  isCompleted: boolean
): Promise<void> {
  await todoRepository.updateManyTodo(todoIds, isCompleted);
}

async function deleteManyTodo(todoIds: string[]): Promise<void> {
  await todoRepository.deleteManyTodo(todoIds);
}

async function checkExistsTodo(todoId: string) {
  const todo = await todoRepository.getTodoById(todoId);

  if (!todo) {
    throw NotFoundException("Todo không tồn tại");
  }

  return todo;
}

export const todoService = {
  getTodos,
  createTodo,
  updateCompletedTodo,
  deleteTodo,
  updateManyTodo,
  deleteManyTodo,
};
