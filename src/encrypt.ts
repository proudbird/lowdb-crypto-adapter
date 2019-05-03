import crypto from "crypto";
import fs     from "fs";
import getCipherKey from "./getCipherKey";

export default function encrypt(data: string, password: string) {
  const IV: Buffer = crypto.randomBytes(16);
  const ENCRYPTION_KEY = getCipherKey(password);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), IV);
  let encrypted = cipher.update(data);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  const result = IV.toString('hex') + ':' + encrypted.toString('hex');

  return result;
}