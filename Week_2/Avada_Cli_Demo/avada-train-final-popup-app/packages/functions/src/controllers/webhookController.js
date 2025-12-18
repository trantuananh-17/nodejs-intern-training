import {getCurrentShopData} from '@functions/helpers/auth';
import * as webhookService from '@functions/services/webhookService';

export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-shopify-Shop-Domain');
    const orderData = ctx.req.body;

    await webhookService.listenNewOrder(shopifyDomain, orderData);

    ctx.status = 200;
    ctx.body = {
      success: true
    };
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      success: false
    });
  }
}

export async function createWebhook(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);

    await webhookService.registerWebhook(shopData);

    console.log('Create webhook successfully');

    ctx.status = 200;
    ctx.body = {
      success: true
    };
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      success: false
    });
  }
}
