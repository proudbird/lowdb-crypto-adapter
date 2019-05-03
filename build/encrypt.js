"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const getCipherKey_1 = __importDefault(require("./getCipherKey"));
function encrypt(data, password) {
    const IV = crypto_1.default.randomBytes(16);
    const ENCRYPTION_KEY = getCipherKey_1.default(password);
    let cipher = crypto_1.default.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), IV);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const result = IV.toString('hex') + ':' + encrypted.toString('hex');
    return result;
}
exports.default = encrypt;
//# sourceMappingURL=encrypt.js.map