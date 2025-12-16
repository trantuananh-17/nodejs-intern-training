import * as notificationService from '@functions/services/notificationService';
import {getCurrentShopData} from '../helpers/auth';

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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
}
