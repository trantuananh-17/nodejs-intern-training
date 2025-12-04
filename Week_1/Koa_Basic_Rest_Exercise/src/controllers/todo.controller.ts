import { ICreateTodoDto } from '../databases/interfaces/todo.interface';
import { todoRepository } from '../databases/repositories/todo.repository';
import { Context } from 'koa';
import logger from '../helpers/logger.helper';
class TodoController {
  public async getTodos(ctx: Context) {
    try {
      const todos = await todoRepository.getTodos();

      ctx.status = 200;
      return (ctx.body = {
        success: true,
        data: todos,
        message: 'Todos fetched successfully'
      });
    } catch (error) {
      const err = error as Error;

      ctx.status = 404;
      ctx.body = {
        success: false,
        error: err.message
      };
    }
  }

  public async createTodo(ctx: Context) {
    try {
      const todoData = ctx.request.body;
      const todo = await todoRepository.createTodo(todoData as ICreateTodoDto);

      ctx.status = 201;
      return (ctx.body = {
        success: true,
        data: todo,
        message: 'Todo created successfully'
      });
    } catch (error) {
      const err = error as Error;

      ctx.status = 404;
      ctx.body = {
        success: false,
        error: err.message
      };
    }
  }

  public async updateCompletedTodo(ctx: Context) {
    try {
      const todoId = Number(ctx.params.todoId);

      const { isCompleted } = ctx.request.body as { isCompleted: boolean };

      const todo = await todoRepository.updateCompletedTodo(todoId, isCompleted);
      ctx.status = 200;
      return (ctx.body = {
        success: true,
        data: todo,
        message: 'Todo updated successfully'
      });
    } catch (error) {
      const err = error as Error;

      ctx.status = 404;
      ctx.body = {
        success: false,
        error: err.message
      };
    }
  }

  public async deleteTodo(ctx: Context) {
    try {
      const todoId = Number(ctx.params.todoId);

      await todoRepository.deleteTodo(todoId);

      ctx.status = 200;
      return (ctx.body = {
        success: true,
        message: 'Todo deleted successfully'
      });
    } catch (error) {
      const err = error as Error;

      ctx.status = 404;
      ctx.body = {
        success: false,
        error: err.message
      };
    }
  }

  public async updateManyTodo(ctx: Context) {
    try {
      const { todoIds, isCompleted } = ctx.request.body as { todoIds: number[]; isCompleted: boolean };

      const updatedTodos = await todoRepository.updateManyTodo(todoIds, isCompleted);
      logger.info(JSON.stringify(updatedTodos));

      ctx.status = 200;
      return (ctx.body = {
        success: true,
        data: updatedTodos,
        message: 'Todos updated successfully'
      });
    } catch (error) {
      const err = error as Error;

      ctx.status = 404;
      ctx.body = {
        success: false,
        error: err.message
      };
    }
  }

  public async deleteManyTodo(ctx: Context) {
    try {
      const { todoIds } = ctx.request.body as { todoIds: number[] };

      await todoRepository.deleteManyTodo(todoIds);

      ctx.status = 200;
      return (ctx.body = {
        success: true,
        message: 'Todos deleted successfully'
      });
    } catch (error) {
      const err = error as Error;

      ctx.status = 404;
      ctx.body = {
        success: false,
        error: err.message
      };
    }
  }
}

export const todoController = new TodoController();
