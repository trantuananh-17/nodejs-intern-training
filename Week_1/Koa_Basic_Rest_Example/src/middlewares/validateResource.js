const validateResource = (schema) => async (ctx, next) => {
  const result = schema.safeParse(ctx.request.body);

  if (!result.success) {
    ctx.status = 400;
    ctx.body = {
      errors: result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    };
    return;
  }

  await next();
};

export default validateResource;
