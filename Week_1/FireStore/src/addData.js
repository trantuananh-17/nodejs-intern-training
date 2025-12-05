import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "firebase-admin/firestore";
import serviceAccount from "../serviceAccount.json" with { type: "json" };

import admin from "firebase-admin";


initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

const data = {
  name: "Los ",
  state: "CA",
  country: "USA",
};

(async () => {
  try {
    // await db.collection("cities").add(data);
    await db.collection("cities").doc("LA").update({
  name: admin.firestore.FieldValue.delete()
});
    console.log("Successfully");
    
  } catch (error) {
    console.log("Error");
    
  } 
})();
