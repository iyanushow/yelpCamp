"use strict";

var campgroundRoutes = require('../routes/campgrounds'),
    campground = require('../models/campground'),
    commentRoutes = require('../routes/comments'),
    comment = require('../models/comment'),
    expressSession = require('express-session'),
    authRoutes = require('../routes/index'),
    User = require('../models/user'),
    localStrategy = require('passport-local'),
    flash = require('connect-flash'),
    bodyparser = require('body-parser'),
    passport = require('passport'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelpDB', {
  useNewUrlParser: true
}, {
  useUnifiedTopology: true
});

module.exports = function (app) {
  //PASSPORT CONFIG
  app.use(expressSession({
    secret: 'secret message',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyparser.urlencoded({
    extended: true
  }));
  app.use(flash());
  app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
  });
  app.use(authRoutes);
  app.use('/campgrounds', campgroundRoutes);
  app.use('/campgrounds/:id/comments', commentRoutes);
  passport.use(new localStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};