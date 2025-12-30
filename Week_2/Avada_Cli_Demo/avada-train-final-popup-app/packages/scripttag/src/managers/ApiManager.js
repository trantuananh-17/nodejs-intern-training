import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return await this.getApiData();
  };

  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;
    const productId = window?.meta?.product?.id || null;
    const {notifications, settings, cartStickies, product} = await makeRequest(
      `https://127.0.0.1:3000/clientApi/notifications?shopifyDomain=${shopifyDomain}&&productId=${productId}`
    );

    return {notifications, settings, cartStickies, product};
  };
}
