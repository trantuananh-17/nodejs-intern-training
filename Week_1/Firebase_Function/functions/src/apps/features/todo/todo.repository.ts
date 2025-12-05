import db from "../../global/databases";
import admin from "firebase-admin";
import { mapFirestoreToTodoDto } from "./todo.mapper";
import { ICreateTodoDto, ITodoDto } from "./todo.interface";

const todosCollection = db.collection("todos");

async function createTodo(reqBody: ICreateTodoDto): Promise<ITodoDto> {
  const { text } = reqBody;

  const payload = {
    text,
    isCompleted: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  const todoRef = await todosCollection.add(payload);

  const snapshot = await todoRef.get();

  const data = snapshot.data();

  return mapFirestoreToTodoDto(snapshot.id, data);
}

async function updateCompletedTodo(
  todoId: string,
  isCompleted: boolean
): Promise<ITodoDto> {
  const todoRef = todosCollection.doc(todoId);

  await todoRef.update({
    isCompleted,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  const snapshot = await todoRef.get();

  const data = snapshot.data();

  return mapFirestoreToTodoDto(snapshot.id, data);
}

async function deleteTodo(todoId: string) {
  await todosCollection.doc(todoId).delete();
}

async function getTodos(): Promise<ITodoDto[]> {
  const snapshot = await todosCollection.get();

  return snapshot.docs.map((doc) => mapFirestoreToTodoDto(doc.id, doc.data()));
}

async function updateManyTodo(todoIds: string[], isCompleted: boolean) {
  const batch = db.batch();

  todoIds.forEach((u) => {
    const docRef = todosCollection.doc(u);
    batch.update(docRef, { isCompleted });
  });

  await batch.commit();
}

async function deleteManyTodo(todoIds: string[]) {
  const batch = db.batch();

  todoIds.forEach((u) => {
    const docRef = todosCollection.doc(u);
    batch.delete(docRef);
  });

  await batch.commit();
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
  getTodoById,
};
