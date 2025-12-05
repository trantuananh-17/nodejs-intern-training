import { Timestamp } from "firebase-admin/firestore";

export interface ITodoDto {
  id: string;
  text: string;
  isCompleted: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ICreateTodoDto {
  text: string;
}
