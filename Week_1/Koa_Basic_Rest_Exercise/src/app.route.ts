import Application from 'koa';
import bookRoute from './routes/book.route';
import Router from 'koa-router';

function appRoutes(app: Application) {
  const router = new Router({
    prefix: '/api/v1'
  });

  router.use(bookRoute.routes());

  app.use(router.routes());
  app.use(router.allowedMethods());
}

export default appRoutes;
