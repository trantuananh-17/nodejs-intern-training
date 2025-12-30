import * as productRepository from '@functions/repositories/productRepository';
import * as shopSerivce from '@functions/services/shopService';

export async function getProducts(shopData, first, after) {
  const result = await productRepository.getProducts(shopData, first, after);

  const products = result.products.edges.map(({node}) => mapProductNode(node));

  return {
    products,
    hasNext: result.products.pageInfo.hasNextPage,
    endCursor: result.products.pageInfo.endCursor
  };
}

export async function getProduct(shopData, productId) {
  const result = await productRepository.getProductById(shopData, productId);

  console.log(result);

  if (!result) return;

  return mapProductNode(result.product);
}

export async function getProductStoreFront(shopDomain, productId) {
  const shopData = await shopSerivce.getShopByShopifyDomain(shopDomain);

  return await getProduct(shopData, productId);
}

function mapProductNode(node) {
  if (!node) return null;

  return {
    id: node.id.replace('gid://shopify/Product/', ''),
    title: node.title,
    handle: node.handle,
    tags: node.tags || [],
    hasOnlyDefaultVariant: node.hasOnlyDefaultVariant,
    status: node.status,
    totalInventory: node.totalInventory,

    options: node.options || [],

    metafields: node.metafields ?? {edges: []},

    variants:
      node.variants?.edges?.map(({node: variant}) => ({
        id: variant.id.replace('gid://shopify/ProductVariant/', ''),
        title: variant.title,
        price: variant.price,
        compareAtPrice: variant.compareAtPrice,
        inventoryQuantity: variant.inventoryQuantity,
        availableForSale: variant.availableForSale,
        inventoryPolicy: variant.inventoryPolicy,
        selectedOptions: variant.selectedOptions,
        isTracked: variant.inventoryItem?.tracked ?? false
      })) ?? [],

    image: node.media?.edges?.[0]?.node?.image?.url || null
  };
}
