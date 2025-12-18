import * as settingRepository from '@functions/repositories/settingRepository';

export async function createSetting(shopID, data) {
  return await settingRepository.createSetting(shopID, data);
}

export async function updateSetting(shopID, data) {
  await getSettingByShopId(shopID);

  return await settingRepository.updateSetting(shopID, data);
}

/**
 *
 * @param {*} shopID
 * @returns {Promise<setting>}
 */
export async function getSettingByShopId(shopID) {
  const setting = await settingRepository.getSettingByShopId(shopID);

  if (!setting) throw new Error('Setting Not Found:', setting);

  return setting;
}
/**
 * Hàm này sẽ loại bỏ các dữ liệu: created at, updated at, shopID
 *
 * @param {*} shopId
 * @returns {Promise<setting>}
 */
export async function getSettingByShopIdForClientApi(shopId) {
  const setting = await getSettingByShopId(shopId);

  return {
    position: setting.position,
    hideTimeAgo: setting.hideTimeAgo,
    truncateProductName: setting.truncateProductName,
    displayDuration: setting.displayDuration,
    firstDelay: setting.firstDelay,
    popsInterval: setting.popsInterval,
    maxPopsDisplay: setting.maxPopsDisplay,
    includedUrls: setting.includedUrls,
    excludedUrls: setting.excludedUrls,
    allowShow: setting.allowShow
  };
}

/**
 *
 * @param {*} shopID
 * @returns {Promise<void>}
 */
export async function createInitSettingAfterLogin(shopID) {
  const setting = await settingRepository.getSettingByShopId(shopID);

  const defaultSettingForm = {
    position: 'bottom-left',
    hideTimeAgo: true,
    truncateProductName: false,
    displayDuration: 0,
    firstDelay: 0,
    popsInterval: 0,
    maxPopsDisplay: 0,
    allowShow: 'all-pages',
    includedUrls: '',
    excludedUrls: '',
    shopId: ''
  };

  if (!setting) {
    createSetting(shopID, defaultSettingForm);
  }
}
