import {getCurrentShopData, getCurrentUserInstance} from '@functions/helpers/auth';
import * as settingService from '@functions/services/settingService';

/**
 * Lấy app setting
 *
 * @param {Context|Object|*} ctx
 * @returns {Promise<void>}
 */
export async function getSetting(ctx) {
  try {
    const {shopID} = getCurrentUserInstance(ctx);

    const appSetting = await settingService.getSettingByShopId(shopID);

    ctx.status = 200;
    ctx.body = {
      data: appSetting
    };
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}

/**
 * Cập nhật app setting
 *
 * @param {Context|Object|*} ctx
 * @returns {Promise<void>}
 */
export async function updateOne(ctx) {
  try {
    const {shopID} = getCurrentUserInstance(ctx);
    const data = ctx.req.body;

    await settingService.updateSetting(shopID, data);

    ctx.status = 200;
    ctx.body = {success: true};
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}

/**
 * Khởi tạo init setting khi login
 *
 * @param {Context|Object|*} ctx
 * @returns {Promise<void>}
 */
export async function createInitSettingAfterLogin(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);

    await settingService.createInitSettingAfterLogin(shopData.id, shopData.shopifyDomain);
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}
