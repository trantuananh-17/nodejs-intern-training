import Application from "koa";
import Router from "koa-router";
import todoRoute from "../../features/todo/todo.route";

function appRoutes(app: Application) {
  const router = new Router({
    prefix: "/api/v1",
  });

  router.use(todoRoute.routes());

  app.use(router.routes());
  app.use(router.allowedMethods());
}

export default appRoutes;
