import { Context } from "koa";
import { todoRepository } from "./todo.repository";
import { ICreateTodoDto } from "./todo.interface";

async function getTodos(ctx: Context): Promise<void> {
  try {
    const todos = await todoRepository.getTodos();

    ctx.status = 200;
    ctx.body = {
      success: true,
      data: todos,
      message: "Lấy danh sách todo thành công",
    };
  } catch (error) {
    const err = error as Error;

    ctx.status = 404;
    ctx.body = {
      success: false,
      error: err.message,
    };
  }
}

async function createTodo(ctx: Context): Promise<void> {
  try {
    const todoData = ctx.request.body;
    const todo = await todoRepository.createTodo(todoData as ICreateTodoDto);

    ctx.status = 201;
    ctx.body = {
      success: true,
      data: todo,
      message: "Thêm mới todo thành công",
    };
  } catch (error) {
    const err = error as Error;

    ctx.status = 404;
    ctx.body = {
      success: false,
      error: err.message,
    };
  }
}

async function updateCompletedTodo(ctx: Context): Promise<void> {
  try {
    const todoId = ctx.params.todoId;

    const { isCompleted } = ctx.request.body as { isCompleted: boolean };

    const todo = await todoRepository.updateCompletedTodo(todoId, isCompleted);
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: todo,
      message: "Cập nhật todo thành công",
    };
  } catch (error) {
    const err = error as Error;

    ctx.status = 404;
    ctx.body = {
      success: false,
      error: err.message,
    };
  }
}

async function deleteTodo(ctx: Context): Promise<void> {
  try {
    const todoId = ctx.params.todoId;

    await todoRepository.deleteTodo(todoId);

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "Xóa todo thành công",
    };
  } catch (error) {
    const err = error as Error;

    ctx.status = 404;
    ctx.body = {
      success: false,
      error: err.message,
    };
  }
}

async function updateManyTodo(ctx: Context): Promise<void> {
  try {
    const { todoIds, isCompleted } = ctx.request.body as {
      todoIds: string[];
      isCompleted: boolean;
    };

    const updatedTodos = await todoRepository.updateManyTodo(
      todoIds,
      isCompleted
    );

    ctx.status = 200;
    ctx.body = {
      success: true,
      data: updatedTodos,
      message: "Todos updated successfully",
    };
  } catch (error) {
    const err = error as Error;

    ctx.status = 404;
    ctx.body = {
      success: false,
      error: err.message,
    };
  }
}

async function deleteManyTodo(ctx: Context): Promise<void> {
  try {
    const { todoIds } = ctx.request.body as { todoIds: string[] };

    await todoRepository.deleteManyTodo(todoIds);

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "Todos deleted successfully",
    };
  } catch (error) {
    const err = error as Error;

    ctx.status = 404;
    ctx.body = {
      success: false,
      error: err.message,
    };
  }
}

export const todoController = {
  getTodos,
  createTodo,
  updateCompletedTodo,
  deleteTodo,
  updateManyTodo,
  deleteManyTodo,
};
