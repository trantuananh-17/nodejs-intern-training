import { ITodoDto } from '../interfaces/todo.interface';

export function mapFirestoreToTodoDto(id: string, data: any): ITodoDto {
  return {
    id,
    text: data.text,
    isCompleted: data.isCompleted,
    createdAt: data.createdAt.toDate().toISOString() ?? '',
    updatedAt: data.updatedAt.toDate().toISOString() ?? ''
  };
}
