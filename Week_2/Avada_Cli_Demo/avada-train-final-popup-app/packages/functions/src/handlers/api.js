import {verifyEmbedRequest} from '@avada/core';
import appConfig from '@functions/config/app';
import shopifyConfig from '@functions/config/shopify';
import shopifyOptionalScopes from '@functions/config/shopifyOptionalScopes';
import * as notificationController from '@functions/controllers/notificationController';
import * as settingController from '@functions/controllers/settingController';
import * as webhookController from '@functions/controllers/webhookController';
import * as cartStickyController from '@functions/controllers/cartStickyController';
import createErrorHandler from '@functions/middleware/errorHandler';
import apiRouter from '@functions/routes/api';
import * as errorService from '@functions/services/errorService';
import App from 'koa';
import render from 'koa-ejs';
import path from 'path';

// Initialize all demand configuration for an application
const api = new App();
api.proxy = true;

render(api, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
api.use(createErrorHandler());
api.use(
  verifyEmbedRequest({
    returnHeader: true,
    apiKey: shopifyConfig.apiKey,
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    hostName: appConfig.baseUrl,
    isEmbeddedApp: true,
    optionalScopes: shopifyOptionalScopes,
    accessTokenKey: shopifyConfig.accessTokenKey,
    afterLogin: async ctx => {
      try {
        await Promise.all([
          settingController.createInitSettingAfterLogin(ctx),
          notificationController.syncOrdersToNotifications(ctx),
          cartStickyController.createInitCartStickyAfterLogin(ctx),
          webhookController.createWebhook(ctx)
        ]);
      } catch (error) {
        console.log(error);
      }
    },
    afterInstall: ctx => {
      console.log('install app');
    },
    initialPlan: {
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      features: {}
    }
  })
);
const router = apiRouter(true);
// Register all routes for the application
api.use(router.allowedMethods());
api.use(router.routes());

// Handling all errors
api.on('error', errorService.handleError);

export default api;
