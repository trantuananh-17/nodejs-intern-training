import * as notificationService from '@functions/services/notificationService';
import {getCurrentShopData} from '@functions/helpers/auth';

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function syncOrdersToNotifications(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);

    await notificationService.syncOrdersToNotification(shopData);
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}

/**
 *
 * @param {*} ctx
 * @returns
 */
export async function syncManualOrdersToNotifications(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);

    const response = await notificationService.syncManualOrdersToNotifications(shopData);
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: response
    };
  } catch (error) {
    console.error(error);
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

export async function deleteNotificationByIds(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);

    const {ids} = ctx.req.body;

    console.log('ids:', ids);

    const notifications = await notificationService.deleteNotificationsByIds(
      ids,
      shopData.id,
      shopData.shopifyDomain
    );
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: notifications
    };
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}
