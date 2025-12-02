import * as path from 'path';
import { promises as fs } from 'fs';

const getFilePath = (fileName: string) => {
  return path.join(process.cwd(), 'src', fileName);
};

export const readData = async (fileName: string) => {
  const filePath = getFilePath(fileName);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

export const writeDataToFile = async (data: any, fileName: string) => {
  const filePath = getFilePath(fileName);
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, json);
};
