import {initShopify} from '@functions/services/shopifyService';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';

/**
 *  abc
 * @param {object} shopData
 * @returns {Promise<order[]>}
 */
export async function getLatestOrders(shopData) {
  const shopify = await initShopify(shopData);
  const orderQuery = loadGraphQL('/order.graphql');
  const orderGraphql = await shopify.graphql(orderQuery);

  return orderGraphql;
}
