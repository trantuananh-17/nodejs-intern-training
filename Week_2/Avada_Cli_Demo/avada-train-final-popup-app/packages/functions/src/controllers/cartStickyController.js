import {getCurrentShopData} from '@functions/helpers/auth';
import * as cartStickyService from '@functions/services/cartStickyService';

export async function getCartSticky(ctx) {
  try {
    const {shopID} = getCurrentUserInstance(ctx);

    const cartSticky = await cartStickyService.getCartStickyByShopId(shopID);

    ctx.status = 200;
    ctx.body = {
      data: cartSticky
    };
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}

export async function updateCartSticky(ctx) {
  try {
    const {shopID} = getCurrentUserInstance(ctx);
    const data = ctx.req.body;

    await cartStickyService.updateCartSticky(shopID, data);

    ctx.status = 200;
    ctx.body = {success: true};
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}

export async function createInitCartStickyAfterLogin(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);

    await cartStickyService.createInitCartStickyAfterLogin(shopData.id, shopData.shopifyDomain);
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}
