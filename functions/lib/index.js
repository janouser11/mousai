"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const config_1 = require("./config");

admin.initializeApp(functions.config().firebase);
const main = express();
const port = 3001;
var cors = require("cors");

const client_secret = functions.config().spotify
  ? functions.config().spotify.client_secret
  : config_1.default.client_secret;
const redirect_uri = functions.config().spotify
  ? functions.config().spotify.redirect_url
  : config_1.default.redirect_url;

console.log("redirect_uri" + redirect_uri);
exports.api = functions.https.onRequest(main);
main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: true }));
main.get("/", (req, res) => res.send("Home"));
main.get("/token", (req, res) => {
  const code = req.query.code;
  if (!code) {
    res.status(422).send("No code provided");
    return;
  }
  var details = {
    grant_type: "authorization_code",
    code,
    redirect_uri,
    client_id: "79556df2e7334701bb1e9f9217101cb2",
    client_secret
  };
  var formBody = Object.keys(details)
    .map((key, index) => {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(details[key]);
      return encodedKey + "=" + encodedValue;
    })
    .join("&");
  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    },
    body: formBody
  })
    .then(res => res.json())
    .then(body => {
      console.log(body);
      res.send(body);
    });
});

main.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=index.js.map
