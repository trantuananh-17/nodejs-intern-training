import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';

const firestore = new Firestore();
/** @type CollectionReference */
const notificationRef = firestore.collection('notifications');

export async function getNotifications(id, domain) {
  const snapshot = await notificationRef
    .where('shopId', '==', id)
    .where('shopifyDomain', '==', domain)
    .limit(30)
    .orderBy('timestamp', 'desc')
    .get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map(doc => presentDataAndFormatDate(doc));
}

export async function getNotificationsByShopyfiDomain(domain) {
  const snapshot = await notificationRef
    .where('shopifyDomain', '==', domain)
    .orderBy('timestamp', 'desc')
    .limit(30)
    .get();

  return snapshot.docs.map(doc => presentDataAndFormatDate(doc));
}

export async function createNotifications(notifications, shopId, domain) {
  const batch = firestore.batch();

  notifications.forEach(n => {
    const ref = notificationRef.doc();

    batch.set(ref, {
      ...n,
      shopId,
      shopifyDomain: domain
    });
  });

  await batch.commit();

  return true;
}

export async function addNotification(shopId, shopifyDomain, data) {
  await notificationRef.doc().set({...data, shopId, shopifyDomain});
}
