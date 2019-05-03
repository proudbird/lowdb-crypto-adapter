
# lowdb-crypto-adapter #

A [lowdb](https://github.com/typicode/lowdb) adapter for encrypting data to be store

## Quickstart

```shell
npm install lowdb-crypto-adapter
```

## Usage

```javascript
const low = require('lowdb');
const CryptoAdapter = require('lowdb-crypto-adapter');

let adapter;
try {
  adapter = new CryptoAdapter('my.db', 'PASSWORD');
} catch(error) {
  console.log("Maybe wrong password?");
}

// and then you can use lowdb as usual, but now your data is secured

const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ posts: [], user: {}, count: 0 })
  .write()

// Add a post
db.get('posts')
  .push({ id: 1, title: 'lowdb is awesome'})
  .write()

// Set a user using Lodash shorthand syntax
db.set('user.name', 'typicode')
  .write()
  
// Increment count
db.update('count', n => n + 1)
  .write()

```

## API

### new CryptoAdapter(file, password, [test])

Creates a new adapter for lowdb

#### Arguments

* `file` - (string) Path to the database file
* `password` - (string) Sekret key, that will be used to encrypt/decrypt data
* `[test]` - (boolen) If true, a connection to the database will be performed, and, if it will faled, an Error will be thrown

## License

[MIT](./LICENSE)