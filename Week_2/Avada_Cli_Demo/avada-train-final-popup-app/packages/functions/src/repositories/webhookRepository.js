import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';
import {initShopify} from '@functions/services/shopifyService';

export async function getProductByProductId(shopData, productId) {
  const shopify = await initShopify(shopData);

  const productQuery = loadGraphQL('/product.graphql');

  const variables = {
    id: `gid://shopify/Product/${productId}`
  };

  const productGraphql = await shopify.graphql(productQuery, variables);

  return productGraphql.product.featuredImage.url;
}
