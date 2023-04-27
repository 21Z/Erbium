const Erbium = require('./Base/Erbium');

// instantiate client
const client = new Erbium();

// connect to discord
client.login();

module.exports = client;
