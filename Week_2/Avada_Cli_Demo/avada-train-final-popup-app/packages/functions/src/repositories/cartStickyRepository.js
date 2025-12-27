import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';

const firestore = new Firestore();
/** @type CollectionReference */
const cartRef = firestore.collection('cartStickies');

/**
 * create cart sticky setting after login
 *
 * @param {*} shopID
 * @param {*} shopifyDomain
 * @param {*} data
 * @returns {Promise<cartSticky>}
 */
export async function createOne(shopId, shopifyDomain, data) {
  const cartSticky = await cartRef
    .doc(shopId)
    .set({...data, shopId, shopifyDomain, createdAt: new Date()});
  return cartSticky;
}

/**
 * get cart sticky setting by shop id
 *
 * @param {*} shopId
 * @returns {Promise<presentDataAndFormatDate(cartSticky)>}
 */
export async function getByShopId(shopId) {
  const docs = await cartRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();

  if (docs.empty) {
    return null;
  }

  const [doc] = docs.docs;
  return presentDataAndFormatDate(doc);
}

/**
 * get cart sticky setting by shopify domain
 *
 * @param {*} shopifyDomain
 * @returns {Promise<presentDataAndFormatDate(cartSticky)>}
 */
export async function getByShopifyDomain(shopifyDomain) {
  const docs = await cartRef
    .where('shopifyDomain', '==', shopifyDomain)
    .limit(1)
    .get();

  if (docs.empty) {
    return null;
  }

  const [doc] = docs.docs;
  return presentDataAndFormatDate(doc);
}

/**
 * update cart sticky setting
 *
 * @param {*} shopId
 * @param {*} data
 * @returns {Promise<WriteResult>}
 */
export async function updateOne(shopId, data) {
  const updated = await cartRef.doc(shopId).update({
    ...data,
    updatedAt: new Date()
  });

  return updated;
}
