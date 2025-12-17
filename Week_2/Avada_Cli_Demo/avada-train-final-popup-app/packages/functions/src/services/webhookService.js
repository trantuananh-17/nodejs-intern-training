import * as shopService from '@functions/services/shopService';
import * as notificationService from '@functions/services/notificationService';
import {initShopify} from '@functions/services/shopifyService';
import appConfig from '@functions/config/app';

export async function listenNewOrder(shopifyDomain, orderData) {
  const shopData = await shopService.getShopByShopifyDomain(shopifyDomain);

  const notification = await notificationService.getNotificationItem(shopData, orderData);

  await notificationService.addNotification(shopData.id, shopData.shopifyDomain, notification);
}

export async function registerWebhook(shopData) {
  const shopify = initShopify(shopData);

  const currentWebhooks = await shopify.webhook.list();
  const unusedHooks = currentWebhooks.filter(
    webhook => !webhook.address.includes(appConfig.baseUrl)
  );

  if (unusedHooks.length > 0) {
    await Promise.all(unusedHooks.map(hook => shopify.webhook.delete(hook.id)));
  }

  const webhooks = await shopify.webhook.list({
    address: `https://${appConfig.baseUrl}/webhook/order/new`
  });

  console.log(`https://${appConfig.baseUrl}/webhook/order/new`);
  if (webhooks.length === 0) {
    return shopify.webhook.create({
      topic: 'orders/create',
      address: `https://${appConfig.baseUrl}/webhook/order/new`,
      format: 'json'
    });
  }
}
