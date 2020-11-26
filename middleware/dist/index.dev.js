"use strict";

var campground = require('../models/campground'),
    comment = require("../models/comment");

var middleObj = {
  isLoggedIn: function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("error", "Please Log in");
      res.redirect('/login');
    }
  },
  isOwner: function isOwner(req, res, next) {
    if (req.isAuthenticated()) {
      campground.findById(req.params.id, function (err, campground) {
        if (err) {
          console.log(err);
          req.flash("error", "Campground not found");
          res.redirect('/campgrounds');
        } else {
          // does user own this camp
          if (campground.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "Permission Denied: not your campground");
            res.redirect("back");
          }
        }
      });
    } else {
      req.flash("error", "Please log in");
      res.redirect("back");
    }
  },
  isCommentOwner: function isCommentOwner(req, res, next) {
    if (req.isAuthenticated()) {
      comment.findById(req.params.comm, function (err, comment) {
        if (err) {
          console.log(err);
          res.redirect("back");
        } else {
          // does user own this camp
          if (comment.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "Permission Denied: not your campground");
            res.redirect("back");
          }
        }
      });
    } else {
      req.flash("error", "Please log in");
      res.redirect("back");
    }
  }
};
module.exports = middleObj;