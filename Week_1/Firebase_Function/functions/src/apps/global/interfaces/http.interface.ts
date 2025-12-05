export interface HttpException extends Error {
  status: "error";
  statusCode: number;
}
