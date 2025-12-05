import { AnySchema, ValidationError } from "yup";
import { Context, Next } from "koa";

export const validateInput =
  (schema: AnySchema) => async (ctx: Context, next: Next) => {
    try {
      ctx.request.body = await schema.validate(ctx.request.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      await next();
    } catch (error) {
      const err = error as ValidationError;

      ctx.status = 400;
      ctx.body = {
        success: false,
        errors: err.errors,
      };
    }
  };
