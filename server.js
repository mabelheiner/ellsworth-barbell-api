const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;
const app = express();
const {auth, requiresAuth} = require('express-openid-connect');

//oauth
require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.GITHUB_CLIENT_SECRET,
  baseURL: process.env.GITHUB_BASE_URL,
  clientID: process.env.GITHUB_CLIENT_ID,
  issuerBaseURL: process.env.GITHUB_ISSUER_BASE_URL,
};

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'))
  .use(auth(config))
  .get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});