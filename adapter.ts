import FileSync from "lowdb/adapters/FileSync";
import encrypt from "./encrypt"
import decrypt from "./decrypt"
import fs from "fs";

const Base = FileSync as any;

export default class CryptoAdapter extends Base {
  constructor(file: string, password: string, test: boolean = true) {
    super(file, {
      defaultValue: {},
      serialize: (data: string) => _serialize(data, password),
      deserialize: (data: string) => _deserialize(data, password)
    });
    if(test) {
      testConnection(file, password);
    }
  }
}

function _serialize(data: string = "", password: string) {
  const result = encrypt(JSON.stringify(data), password);
  return result;
}

function _deserialize(data: string, password: string) {
  const result = JSON.parse(decrypt(data, password));
  return result;
}

function testConnection(file: string, password: string) {
  let result = fs.readFileSync(file, "UTF-8");
  try {
    result = JSON.parse(decrypt(result, password));
  } catch(error) {
    error.message = "Unsuccessful  attempt to connect to the database. The reasn is: \n" + error.message;
    throw error;
  }
}
