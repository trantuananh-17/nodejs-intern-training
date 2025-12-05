import { readData, writeDataToFile } from '../../helpers/file';
import { ICreateTodoDto, ITodoDto } from '../interfaces/todo.interface';
import logger from '../../helpers/logger.helper';
import db from '../db';
import admin from 'firebase-admin';
import { mapFirestoreToTodoDto } from '../mappers/todoMapper';

const todosCollection = db.collection('todos');

async function createTodo(reqBody: ICreateTodoDto): Promise<ITodoDto> {
  // const todos = await readData('databases/todo.json');

  // const todoId = todos.length > 0 ? Math.floor(Math.random() * 1000000) : 1;
  // const todo = { id: todoId, ...reqBody, isCompleted: false };

  // const data = [todo, ...todos];
  // await writeDataToFile(data, 'databases/todo.json');

  const { text } = reqBody;

  const payload = {
    text,
    isCompleted: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };
  const todoRef = await todosCollection.add(payload);

  const snapshot = await todoRef.get();

  const data = snapshot.data();

  return mapFirestoreToTodoDto(snapshot.id, data);
}

async function updateCompletedTodo(todoId: string, isCompleted: boolean): Promise<ITodoDto> {
  // const todos = await readData('databases/todo.json');
  // const index = todos.findIndex((t: ITodoDto) => t.id === todoId);
  // if (index === -1) {
  //   throw new Error('Todo not found');
  // }
  // const updatedTodo = {
  //   ...todos[index],
  //   isCompleted
  // };
  // todos[index] = updatedTodo;
  // await writeDataToFile(todos, 'databases/todo.json');
  // return todos[index];

  const todoRef = todosCollection.doc(todoId);

  await todoRef.update({
    isCompleted,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });

  const snapshot = await todoRef.get();

  const data = snapshot.data();

  return mapFirestoreToTodoDto(snapshot.id, data);
}

async function deleteTodo(todoId: string) {
  // const todos = await readData('databases/todo.json');

  // const todo = todos.filter((todo: ITodoDto) => todo.id !== todoId);

  // await writeDataToFile(todo, 'databases/todo.json');

  await todosCollection.doc(todoId).delete();
}

async function getTodos(): Promise<ITodoDto[]> {
  const snapshot = await todosCollection.get();

  return snapshot.docs.map((doc) => mapFirestoreToTodoDto(doc.id, doc.data()));
}

async function updateManyTodo(todoIds: string[], isCompleted: boolean) {
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

async function deleteManyTodo(todoIds: string[]) {
  const todos = await readData('databases/todo.json');

  const newTodos = todos.filter((todo: ITodoDto) => !todoIds.includes(todo.id));

  await writeDataToFile(newTodos, 'databases/todo.json');
}

async function getTodoById(todoId: string): Promise<ITodoDto | null> {
  const docRef = await todosCollection.doc(todoId).get();

  const data = docRef.data();

  return mapFirestoreToTodoDto(docRef.id, data);
}

export const todoRepository = {
  createTodo,
  updateCompletedTodo,
  deleteTodo,
  getTodos,
  updateManyTodo,
  deleteManyTodo,
  getTodoById
};
