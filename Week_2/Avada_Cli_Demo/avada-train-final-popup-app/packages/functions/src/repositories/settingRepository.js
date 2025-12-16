import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';

const firestore = new Firestore();
/** @type CollectionReference */
const settingRef = firestore.collection('settings');

/**
 * Lấy setting theo shopId
 *
 * @param {string} id
 * @returns {Promise<presentDataFromDoc<settingDoc>>}
 */
export async function getSettingByShopId(id) {
  const docs = await settingRef
    .where('shopId', '==', id)
    .limit(1)
    .get();

  if (docs.empty) {
    return null;
  }

  const [doc] = docs.docs;
  return presentDataAndFormatDate(doc);
}

/**
 * Tạo app setting
 *
 * @param {string} shopId
 * @param {object} data
 * @returns {Promise<settingDoc>}
 */
export async function createSetting(shopId, data) {
  const created = await settingRef.doc(shopId).set({...data, shopId, createdAt: new Date()});
  return created;
}

/**
 * Cập nhật setting
 *
 * @param {string} id
 * @param {object} data
 * @returns {Promise<settingDoc>}
 */
export async function updateSetting(id, data) {
  const updated = await settingRef.doc(id).update({
    ...data,
    shopId: id,
    updatedAt: new Date()
  });

  return updated;
}
