import * as settingRepository from '@functions/repositories/settingRepository';

export async function createSetting(shopID, data) {
  return await settingRepository.createSetting(shopID, data);
}

export async function updateSetting(shopID, data) {
  await getSettingByShopId(shopID);

  return await settingRepository.updateSetting(shopID, data);
}

export async function getSettingByShopId(shopID) {
  const setting = await settingRepository.getSettingByShopId(shopID);

  if (!setting) throw new Error('Setting Not Found:', setting);

  return setting;
}

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
