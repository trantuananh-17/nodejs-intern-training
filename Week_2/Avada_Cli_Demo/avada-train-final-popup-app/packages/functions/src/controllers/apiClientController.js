import * as settingService from '@functions/services/settingService';
import * as notificationService from '@functions/services/notificationService';

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
