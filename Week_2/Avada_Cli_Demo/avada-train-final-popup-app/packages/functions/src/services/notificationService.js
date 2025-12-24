import * as orderService from '@functions/services/orderService';
import * as notificationRepository from '@functions/repositories/notificationRepository';
import * as shopRepository from '@functions/repositories/shopRepository';
import * as webhookRepository from '@functions/repositories/webhookRepository';

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

  await notificationRepository.createNotifications(orders, shopData.id, shopData.shopifyDomain);

  await shopRepository.updateCheckSync(shopData.id);
}

export async function syncManualOrdersToNotifications(shopData) {
  await notificationRepository.deleteNotificationsByShopifyDomain(shopData.shopifyDomain);

  const orders = await orderService.getLatestOrders(shopData);

  console.log(orders);

  const notifications = await notificationRepository.createNotifications(
    orders,
    shopData.id,
    shopData.shopifyDomain
  );

  return notifications;
}

/**
 *
 * @param {*} shopId
 * @param {*} shopifyDomain
 * @returns {Promise<{
 *   city: string;
 *   country: string;
 *   firstName: string;
 *   productId: number;
 *   productName: string;
 *   productImage: any;
 *   timestamp: Date;
 *   shopId: string;
 *   shopDomain: string;
 * }[]>}
 */
export async function getNotifications(shopId, shopifyDomain) {
  return notificationRepository.getNotifications(shopId, shopifyDomain);
}

/**
 * @param {*} shopData
 * @param {*} orderData
 * @returns {Promise<{
 *   city: string;
 *   country: string;
 *   firstName: string;
 *   productId: number;
 *   productName: string;
 *   productImage: any;
 *   timestamp: Date;
 * }>}
 */
export async function getNotificationItem(shopData, orderData) {
  if (!orderData) {
    throw new Error('Order not found');
  }

  const productImage = await webhookRepository.getProductByProductId(
    shopData,
    orderData.line_items[0].product_id
  );

  return {
    city: orderData.shipping_address.city,
    country: orderData.shipping_address.country,
    firstName: orderData.customer.first_name,
    productId: orderData.line_items[0].id,
    productName: orderData.line_items[0].title,
    productImage,
    timestamp: new Date(orderData.created_at)
  };
}

/**
 *
 * @param {*} shopId
 * @param {*} shopifyDomain
 * @param {*} data
 * @returns {Promise<void>}
 */
export async function addNotification(shopId, shopifyDomain, data) {
  return notificationRepository.addNotification(shopId, shopifyDomain, data);
}

export async function getNotificationsByShopifyDomain(shopifyDomain) {
  const data = await notificationRepository.getNotificationsByShopyfiDomain(shopifyDomain);

  const notifications = data.map(({shopId, shopifyDomain, ...rest}) => rest);

  return notifications;
}

export async function deleteNotificationsByIds(ids, shopId, shopifyDomain) {
  await notificationRepository.deleteNotificationByIds(ids);

  const notifications = await notificationRepository.getNotifications(shopId, shopifyDomain);

  return notifications;
}
