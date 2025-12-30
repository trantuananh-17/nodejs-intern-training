import * as settingService from '@functions/services/settingService';
import * as notificationService from '@functions/services/notificationService';
import * as cartStickyService from '@functions/services/cartStickyService';
import * as productService from '@functions/services/productService';

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getNotificationsAndSetting(ctx) {
  try {
    const shopifyDomain = ctx.query.shopifyDomain;
    const productId = ctx.query.productId;

    const [notifications, settings, cartStickies, product] = await Promise.all([
      notificationService.getNotificationsByShopifyDomain(shopifyDomain),
      settingService.getSettingByShopIdForClientApi(shopifyDomain),
      cartStickyService.getCartStickyByShopifyDomain(shopifyDomain),
      productService.getProductStoreFront(shopifyDomain, productId)
    ]);
    console.log(product);

    ctx.status = 200;
    ctx.body = {
      notifications,
      settings,
      cartStickies,
      product
    };
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}

export async function getCartSticky(ctx) {
  try {
    const shopifyDomain = ctx.query.shopifyDomain;

    const cartSticky = await cartStickyService.getCartStickyByShopifyDomain(shopifyDomain);

    ctx.status = 200;
    ctx.body = {
      cartSticky
    };
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}
