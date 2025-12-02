import * as path from "path";

import { promises as fs } from "fs";

const getFilePath = (filename) => {
  return path.join(process.cwd(), filename);
};

export const ReadData = async (filename) => {
  const filePath = getFilePath(filename);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

export const WriteDataToFile = async (filename, data) => {
  const filePath = getFilePath(filename);
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, json);
};
