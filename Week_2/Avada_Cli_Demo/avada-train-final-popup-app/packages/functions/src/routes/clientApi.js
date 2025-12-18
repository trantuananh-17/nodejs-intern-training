import Router from 'koa-router';
import * as notificationController from '@functions/controllers/notificationController';

const router = new Router({
  prefix: '/clientApi'
});

router.get('/notifications', notificationController.getNotificationsAndSetting);
export default router;
