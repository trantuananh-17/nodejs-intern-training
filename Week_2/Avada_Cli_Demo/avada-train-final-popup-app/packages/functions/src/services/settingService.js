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
 * Function will be slice field: created at, updated at, shopID
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
    continueAfterPageReload: setting.continueAfterPageReload,
    isGradient: setting.isGradient,
    backgroundImage: setting.backgroundImage,
    actionColorStart: setting.actionColorStart,
    actionColorEnd: setting.actionColorEnd,
    backgroundColor: setting.backgroundColor,
    themeName: setting.themeName,
    headingColor: setting.headingColor,
    headerTextColor: setting.headerTextColor,
    timeColor: setting.timeColor,
    theme: setting.theme,
    textColor: setting.textColor,
    hideBackgroundSelect: setting.hideBackgroundSelect
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
    shopifyDomain: '',
    isGradient: true,
    backgroundImage: '',
    actionColorStart: '#EEEEEEFF',
    actionColorEnd: '#FFFFFFFF',
    backgroundColor: '#FFFFFFFF',
    themeName: 'Basic',
    headingColor: '#000000FF',
    headerTextColor: '#18A5A7FF',
    timeColor: '#000000FF',
    theme: 'sp-basic',
    textColor: '#000000FF',
    hideBackgroundSelect: false
  };

  if (!setting) {
    createSetting(shopID, shopifyDomain, defaultSettingForm);
  }
}
