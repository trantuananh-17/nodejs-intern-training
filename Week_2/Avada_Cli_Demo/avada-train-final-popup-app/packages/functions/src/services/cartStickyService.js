import * as cartStickyRepository from '@functions/repositories/cartStickyRepository';

/**
 *
 * @param {*} shopID
 * @param {*} shopifyDomain
 * @param {*} data
 * @returns {Promise<cartSticky>}
 */
export async function createCartSticky(shopID, shopifyDomain, data) {
  return await cartStickyRepository.createOne(shopID, shopifyDomain, data);
}

/**
 *
 * @param {*} shopID
 * @param {*} shopifyDomain
 * @returns {Promise<void>}
 */
export async function createInitCartStickyAfterLogin(shopID, shopifyDomain) {
  const cartSticky = await cartStickyRepository.getByShopId(shopID);

  const defaultStickyForm = {
    status: false,
    showProductImage: true,
    showProductPrice: true,
    showQtyInput: true,
    showVariantMobile: false,
    qtyText: 'Quantity',
    successResponse: '👏 Item added to cart!',

    enableDesktop: false,
    enableMobile: true,
    position: 'avada-position-top',

    bgColor: '#ffffff',
    productNameColor: '#000000',
    priceColor: '#000000',
    specialPriceColor: '#FF0000',
    buttonTextColor: '#ffffff',
    buttonBackgroundColor: '#000000',
    buttonBorderRadius: 'none',

    hideOutStock: true,
    cartRedirectCheckout: false,
    showOnHomePage: true,
    specificProducts: [
      {
        status: 'ACTIVE',
        tags: ['Accessory', 'Sport', 'Winter'],
        title: 'Selling Plans Ski Wax'
      }
    ],
    customBtn: true,

    btnAddCartText: 'Add to cart'
  };

  if (!cartSticky) {
    createCartSticky(shopID, shopifyDomain, defaultStickyForm);
  }
}

/**
 *
 * @param {*} shopId
 * @returns {Promise<cartSticky>}
 */
export async function getCartStickyByShopId(shopId) {
  const cartSticky = await cartStickyRepository.getByShopId(shopId);

  if (!cartSticky) throw new Error('Cart sticky Not Found:', setting);

  return cartSticky;
}

/**
 *
 * @param {*} shopifyDomain
 * @returns {Promise<cartSticky>}
 */
export async function getCartStickyByShopifyDomain(shopifyDomain) {
  const cartSticky = await cartStickyRepository.getByShopifyDomain(shopifyDomain);

  if (!cartSticky) throw new Error('Cart sticky Not Found:', setting);

  return cartSticky;
}

export async function updateCartSticky(shopID, data) {
  await getSettingByShopId(shopID);

  return await cartStickyRepository.updateOne(shopID, data);
}
