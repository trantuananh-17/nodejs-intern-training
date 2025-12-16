import * as orderService from '@functions/services/orderService';
import * as notificationRepository from '@functions/repositories/notificationRepository';
import * as shopRepository from '@functions/repositories/shopRepository';

/**
 *
 * Nếu shopData đã đánh dấu sync thì return
 * Nếu chưa có:
 * Lấy 30 orders gần nhất từ orderService
 * Thêm mới lên firestore
 * update shopDate là đã sync
 *
 * @param {*} shopData
 * @returns {Promise<void>}
 */
export async function syncOrdersToNotification(shopData) {
  if (shopData.isSyncedAfterInstall) {
    console.log('Order synced');
    return;
  }

  const orders = await orderService.getLatestOrders(shopData);

  await notificationRepository.createNotification(orders, shopData.id, shopData.shopifyDomain);

  await shopRepository.updateCheckSync(shopData.id);
}

export async function getNotifications(shopId, shopifyDomain) {
  return notificationRepository.getNotifications(shopId, shopifyDomain);
}
