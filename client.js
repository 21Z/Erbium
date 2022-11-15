const Erbium = require("./Base/Erbium.js");

// instantiate client
const client = new Erbium();

// connect to discord
client.login();

module.exports = client;