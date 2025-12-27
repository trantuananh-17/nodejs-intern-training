import Router from 'koa-router';
import * as apiClientController from '@functions/controllers/apiClientController';

const router = new Router({
  prefix: '/clientApi'
});

router.get('/notifications', apiClientController.getNotificationsAndSetting);
export default router;
