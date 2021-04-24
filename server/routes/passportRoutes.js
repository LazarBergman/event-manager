const express = require('express');
const User = require('../schemas/user')
const app = express.Router();
const passport = require('passport');

app.post('/login-admin', (req, res, next) => {
    passport.authenticate('admin',
      function(err, user, info) {
        if (err) {
          res.json(err)
        } else {
          req.logIn(user, function(err) {
            if (user) {
              res.send(user)
            } else {
              res.send(info);
            }
          })
        }
      }
    )(req, res, next);
  });

  app.get('/me', async (req, res, next) => {
    if (req.user) {
      res.json(req.user)
    } else {
      res.send(401);
    }
  });


  app.post('/login-user', (req, res, next) => {
    passport.authenticate('user',
      function(err, user, info) {
        if (err) {
          res.json(err)
        } else {
          req.logIn(user, function(err) {
            if (user) {
              res.send(user)
            } else {
              res.send(info);
            }
          })
        }
      }
    )(req, res, next);
  });

  app.get('/logout', async (req, res) => {
    req.logout()
    res.send('ok')
  })

  module.exports = app;