import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import app from "./apps/app";

setGlobalOptions({ maxInstances: 10 });

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const shopify = onRequest((req, res) => {
  delete req.body;

  if (req.url.startsWith("/shopify")) {
    req.url = req.url.replace("/shopify", "");
  }
  return app.callback()(req, res);
});
