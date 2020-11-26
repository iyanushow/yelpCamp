"use strict";

var express = require('express'),
    middle = require('../middleware'),
    User = require('../models/user'),
    passport = require('passport'),
    router = express.Router(); // HOME ROUTE


router.get('/', function (req, res) {
  res.render('Home');
}); // =========================
// AUTH ROUTES  
// ============================
//REGISTER ROUTES

router.get('/register', function (req, res) {
  res.render('register');
});
router.post('/register', function (req, res) {
  var newUser = new User({
    username: req.body.username
  });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, function () {
        req.flash("success", "Welcome to YelpCamp" + user.username);
        res.redirect('/campgrounds');
      });
    }
  });
}); //LOGIN ROUTES

router.get('/login', function (req, res) {
  res.render('login');
});
router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/register'
}), function (req, res) {});
router.get('/logout', function (req, res) {
  req.logout();
  req.flash("success", "successfully logged out");
  res.redirect('/');
});
module.exports = router;