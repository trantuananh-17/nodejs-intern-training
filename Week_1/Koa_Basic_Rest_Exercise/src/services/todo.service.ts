import { ICreateTodoDto } from '../databases/interfaces/todo.interface';
import { todoRepository } from '../databases/repositories/todo.repository';
import { BadRequestException, NotFoundException } from '../helpers/error';

async function getTodos() {
  return await todoRepository.getTodos();
}

async function createTodo(reqBody: ICreateTodoDto) {
  const todo = await todoRepository.createTodo(reqBody);

  if (!todo) {
    throw BadRequestException('Không thể tạo mới todo');
  }

  return todo;
}

async function updateCompletedTodo(todoId: string, isCompleted: boolean): Promise<null> {
  await checkExistsTodo(todoId);

  const todo = await updateCompletedTodo(todoId, isCompleted);

  return todo;
}

async function deleteTodo() {}

async function updateManyTodo() {}

async function deleteManyTodo() {}

async function checkExistsTodo(todoId: string) {
  const todo = await todoRepository.getTodoById(todoId);

  if (!todo) {
    throw NotFoundException('Todo not found');
  }

  return todo;
}
