import Koa from "koa";
import koaBody from "koa-body";
import router from "./routes/routes.js";
const app = new Koa();

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(5000, () => {
  console.log("Chạy port 5000");
});
