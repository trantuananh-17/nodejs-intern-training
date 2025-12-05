import { IncomingMessage } from "http";

export interface FirebaseRequest extends IncomingMessage {
  rawBody?: Buffer;
}
