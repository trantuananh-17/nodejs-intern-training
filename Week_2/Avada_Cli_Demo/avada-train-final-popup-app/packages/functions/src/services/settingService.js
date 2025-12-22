import * as settingRepository from '@functions/repositories/settingRepository';

export async function createSetting(shopID, shopifyDomain, data) {
  return await settingRepository.createSetting(shopID, shopifyDomain, data);
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
 *
 * @param {*} shopID
 * @returns {Promise<setting>}
 */
export async function getSettingByShopifyDomain(shopifyDomain) {
  const setting = await settingRepository.getSettingByShopifyDomain(shopifyDomain);

  if (!setting) throw new Error('Setting Not Found:', setting);

  return setting;
}

/**
 * Hàm này sẽ loại bỏ các dữ liệu: created at, updated at, shopID
 *
 * @param {*} shopifyDomain
 * @returns {Promise<setting>}
 */
export async function getSettingByShopIdForClientApi(shopifyDomain) {
  const setting = await getSettingByShopifyDomain(shopifyDomain);

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
    allowShow: setting.allowShow,
    replayPlaylist: setting.replayPlaylist,
    continueAfterPageReload: setting.continueAfterPageReload
  };
}

/**
 *
 * @param {*} shopID
 * @returns {Promise<void>}
 */
export async function createInitSettingAfterLogin(shopID, shopifyDomain) {
  const setting = await settingRepository.getSettingByShopId(shopID);

  const defaultSettingForm = {
    position: 'bottom-left',
    hideTimeAgo: true,
    truncateProductName: false,
    replayPlaylist: false,
    continueAfterPageReload: false,
    displayDuration: 0,
    firstDelay: 0,
    popsInterval: 0,
    maxPopsDisplay: 0,
    allowShow: 'all-pages',
    includedUrls: '',
    excludedUrls: '',
    shopId: '',
    shopifyDomain: ''
  };

  if (!setting) {
    createSetting(shopID, shopifyDomain, defaultSettingForm);
  }
}
