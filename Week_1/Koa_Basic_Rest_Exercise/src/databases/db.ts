import admin, { ServiceAccount } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import 'dotenv/config';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n')
    })
  });
}

const db = getFirestore();
export const FieldValue = admin.firestore.FieldValue;
export default db;
