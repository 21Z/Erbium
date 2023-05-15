/* const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello there!");
});

app.listen(3000, () => {
    console.info("[PINGED] Website is up!");
}); */

// load .env
require("dotenv").config();

// instantiate client
require("./client");
