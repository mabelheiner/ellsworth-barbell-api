const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');

require('dotenv').config();

app  
  .use(session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: true,
    saveUninitialized: true
  }))
  .use(passport.initialize())
  .use(passport.session());

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  });

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Logged in');
    app.use('/', require('./routes'));
  } else {
    res.send('Logged out');
  }
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
