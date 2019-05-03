import crypto from "crypto";
import fs     from "fs";
import getCipherKey from "./getCipherKey";

export default function decrypt(data: string, password: string) {
  
    const ENCRYPTION_KEY = getCipherKey(password);
    let parts = data.split(':');
    let IV = Buffer.from(parts.shift(), 'hex');
    let encryptedText = Buffer.from(parts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), IV);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    return decrypted.toString();
}