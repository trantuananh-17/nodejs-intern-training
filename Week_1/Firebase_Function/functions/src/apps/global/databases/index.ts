import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import "dotenv/config";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.APP_PROJECT_ID,
      clientEmail: process.env.APP_CLIENT_EMAIL,
      privateKey: (process.env.APP_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();
export const FieldValue = admin.firestore.FieldValue;
export default db;
