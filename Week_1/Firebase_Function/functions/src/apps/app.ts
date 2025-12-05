import koa from "koa";
import bodyParser from "koa-bodyparser";
import appRoutes from "./global/routes/route";
import { FirebaseRequest } from "./global/interfaces/request.interface";
import cors from "@koa/cors";

const app = new koa();

app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(async (ctx, next) => {
  const req: FirebaseRequest = ctx.req;

  if (req.rawBody && Buffer.isBuffer(req.rawBody)) {
    try {
      const jsonString = req.rawBody.toString("utf8");

      ctx.request.body = JSON.parse(jsonString);
    } catch (err) {
      ctx.request.body = {};
    }
  }

  await next();
});

// app.use(bodyParser());

appRoutes(app);

export default app;
