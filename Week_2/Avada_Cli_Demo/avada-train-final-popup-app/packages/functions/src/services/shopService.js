import * as shopRepository from '@functions/repositories/shopRepository';

export async function getShopByShopifyDomain(shopifyDomain) {
  const shop = await shopRepository.getShopByShopifyDomain(shopifyDomain);

  if (!shop) {
    throw new Error('Shop not found');
  }

  return shop;
}
