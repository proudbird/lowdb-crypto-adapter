const low = require('lowdb');
const CryptoAdapter = require('./adapter');

console.log("Crypto adapter test:");

let adapter;
try {
  console.log("Creating new adapter...");
  adapter = new CryptoAdapter('my.db', 'PASSWORD');
} catch(error) {
  console.log("Maybe wrong password?");
}

console.log("Creating a new connection to database...");
const db = low(adapter);

console.log("Creating a new default model 'users'...");
db.defaults({ users: [] })
  .write()

console.log("Adding a new user with name 'Boss'...");
db.get('users')
  .push({ id: 1, name: 'Boss'})
  .write()

console.log("Finding a user with id '1'...");
const user = db.get('users').find({ id: 1 }).value();

console.log("The name of founded user must be 'Boss'");
console.log("> My name is " + user.name);