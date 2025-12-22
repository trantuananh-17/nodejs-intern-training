import * as notificationService from '@functions/services/notificationService';
import * as shopService from '@functions/services/shopService';
import * as settingService from '@functions/services/settingService';
import {getCurrentShopData} from '@functions/helpers/auth';

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function syncOrdersToNotifications(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);

    const data = await notificationService.syncOrdersToNotification(shopData);

    console.log(data);
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getNotifications(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);

    console.log(shopData);

    const data = await notificationService.getNotifications(shopData.id, shopData.shopifyDomain);

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'Lấy danh sách thông báo thành công',
      data
    };
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getNotificationsAndSetting(ctx) {
  try {
    const shopifyDomain = ctx.query.shopifyDomain;

    const [notifications, settings] = await Promise.all([
      await notificationService.getNotificationsByShopifyDomain(shopifyDomain),
      await settingService.getSettingByShopIdForClientApi(shopifyDomain)
    ]);

    ctx.status = 200;
    ctx.body = {
      notifications,
      settings
    };
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}
