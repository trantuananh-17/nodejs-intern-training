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

  const createdNotifications = [];

  notifications.forEach(n => {
    const ref = notificationRef.doc();

    const data = {
      ...n,
      shopId,
      shopifyDomain: domain
    };

    batch.set(ref, data);

    createdNotifications.push({
      id: ref.id,
      ...data
    });
  });

  await batch.commit();

  return createdNotifications;
}

export async function addNotification(shopId, shopifyDomain, data) {
  await notificationRef.doc().set({...data, shopId, shopifyDomain});
}

export async function deleteNotificationsByShopifyDomain(domain) {
  const snapshot = await notificationRef.where('shopifyDomain', '==', domain).get();

  if (snapshot.empty) {
    return 0;
  }

  let deletedCount = 0;

  // Firestore batch giới hạn 500
  const chunks = [];
  for (let i = 0; i < snapshot.docs.length; i += 500) {
    chunks.push(snapshot.docs.slice(i, i + 500));
  }

  for (const docs of chunks) {
    const batch = firestore.batch();

    docs.forEach(doc => {
      batch.delete(doc.ref);
      deletedCount++;
    });

    await batch.commit();
  }

  return deletedCount;
}

export async function deleteNotificationByIds(ids) {
  let deletedCount = 0;

  // Firestore batch giới hạn 500 operations
  for (let i = 0; i < ids.length; i += 500) {
    const batch = firestore.batch();
    const chunk = ids.slice(i, i + 500);

    chunk.forEach(id => {
      const ref = notificationRef.doc(id);
      batch.delete(ref);
      deletedCount++;
    });

    await batch.commit();
  }

  return {
    deleted: deletedCount
  };
}
