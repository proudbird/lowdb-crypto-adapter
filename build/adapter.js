"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
const encrypt_1 = __importDefault(require("./encrypt"));
const decrypt_1 = __importDefault(require("./decrypt"));
const fs_1 = __importDefault(require("fs"));
const Base = FileSync_1.default;
class CryptoAdapter extends Base {
    constructor(file, password, test = true) {
        super(file, {
            defaultValue: {},
            serialize: (data) => _serialize(data, password),
            deserialize: (data) => _deserialize(data, password)
        });
        if (test) {
            testConnection(file, password);
        }
    }
}
function _serialize(data = "", password) {
    const result = encrypt_1.default(JSON.stringify(data), password);
    return result;
}
function _deserialize(data, password) {
    const result = JSON.parse(decrypt_1.default(data, password));
    return result;
}
function testConnection(file, password) {
    if (!fs_1.default.existsSync(file)) {
        fs_1.default.writeFileSync(file, encrypt_1.default(JSON.stringify({}), password));
        return;
    }
    let result = fs_1.default.readFileSync(file, "UTF-8");
    try {
        result = JSON.parse(decrypt_1.default(result, password));
    }
    catch (error) {
        error.message = "Unsuccessful  attempt to connect to the database. The reasn is: \n" + error.message;
        throw error;
    }
}
module.exports = CryptoAdapter;
//# sourceMappingURL=adapter.js.map