import { HttpException } from "../interfaces/http.interface";
import { httpStatus } from "./httpStatus..util";

function createError(name: string, statusCode: number, message: string) {
  const error = new Error(message) as HttpException;

  error.name = name;
  error.status = "error";
  error.statusCode = statusCode;

  return error;
}

export const BadRequestException = (message: string) =>
  createError("BadRequestException", httpStatus.BAD_REQUEST, message);

export const NotFoundException = (message: string) =>
  createError("NotFoundException", httpStatus.NOT_FOUND, message);

export const UnauthorizedException = (message: string) =>
  createError("UnauthorizedException", httpStatus.UNAUTHORIZED, message);

export const ForbiddenException = (message: string) =>
  createError("ForbiddenException", httpStatus.FORBIDDEN, message);

export const ConflictException = (message: string) =>
  createError("ConflictException", httpStatus.CONFLICT, message);

export const InternalServerError = (message: string) =>
  createError("InternalServerError", httpStatus.INTERNAL_SERVER_ERROR, message);
