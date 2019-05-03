import crypto from "crypto";

export default function getCipherKey(password: string) {
  return crypto.createHash('sha256').update(password).digest();
}