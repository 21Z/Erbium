const { config } = require('dotenv');
const NodeFetch = require('node-fetch');
/* const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send('Hello bitch');
});

app.listen(3000, () => {
  console.log("[PINGED] Website is up!")
}); */

// load .env
config();

// eslint-disable-next-line no-undef
Object.defineProperties(globalThis, {
    fetch: {
        value: NodeFetch.default ?? NodeFetch,
        writable: true,
        configurable: true,
        enumerable: false,
    },
});

// instantiate client
require('./client');
