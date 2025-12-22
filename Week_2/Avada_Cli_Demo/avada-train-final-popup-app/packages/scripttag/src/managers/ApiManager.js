import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return await this.getApiData();
  };

  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;
    const {notifications, settings} = await makeRequest(
      `https://127.0.0.1:3000/clientApi/notifications?shopifyDomain=${shopifyDomain}`
    );

    console.log(notifications, settings);

    return {notifications, settings};
  };
}
