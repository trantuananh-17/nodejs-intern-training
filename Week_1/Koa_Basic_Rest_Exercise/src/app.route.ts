import Application from 'koa';
import bookRoute from './routes/book.route';
import Router from 'koa-router';
import todoRoute from './routes/todo.route';

function appRoutes(app: Application) {
  const router = new Router({
    prefix: '/api/v1'
  });

  router.use(bookRoute.routes());
  router.use(todoRoute.routes());

  app.use(router.routes());
  app.use(router.allowedMethods());
}

export default appRoutes;
