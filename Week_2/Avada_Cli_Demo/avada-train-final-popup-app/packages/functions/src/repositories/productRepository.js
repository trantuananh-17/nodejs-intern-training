import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';
import {initShopify} from '@functions/services/shopifyService';

export async function getProductImageByProductId(shopData, productId) {
  const shopify = await initShopify(shopData);

  const productQuery = loadGraphQL('/product.graphql');

  const variables = {
    id: `gid://shopify/Product/${productId}`
  };

  const productGraphql = await shopify.graphql(productQuery, variables);

  return productGraphql.product.featuredImage.url;
}

export async function getProducts(shopData, first, after) {
  const shopify = await initShopify(shopData);

  const productQuery = loadGraphQL('/products.graphql');

  const variables = {
    first,
    after
  };

  const productGraphql = await shopify.graphql(productQuery, variables);

  return productGraphql;
}

export async function getProductById(shopData, productId) {
  const shopify = await initShopify(shopData);

  const productQuery = loadGraphQL('/product.sync.graphql');

  const variables = {
    id: `gid://shopify/Product/${productId}`
  };

  const productGraphql = await shopify.graphql(productQuery, variables);

  return productGraphql;
}
