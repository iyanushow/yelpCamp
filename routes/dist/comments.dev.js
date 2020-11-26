"use strict";

var express = require('express'),
    router = express.Router({
  mergeParams: true
}),
    campground = require('../models/campground'),
    comment = require('../models/comment'),
    middle = require('../middleware'); // =========================
// COMMENTS ROUTES
// ============================


router.get('/new', middle.isLoggedIn, function (req, res) {
  campground.findById(req.params.id, function (err, camp) {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', {
        camp: camp
      });
    }
  });
});
router.post('/', middle.isLoggedIn, function (req, res) {
  campground.findById(req.params.id, function (err, camp) {
    if (err) {
      console.log(err);
    } else {
      comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          //add user 
          comment.author.id = req.user._id;
          comment.author.username = req.user.username; // save comment

          comment.save();
          camp.comments.push(comment);
          camp.save();
          req.flash("success", "comment added");
          res.redirect("/campgrounds/".concat(camp._id));
        }
      });
    }
  });
}); // EDIT UPDATE AND DESTROY ROUTES

router.get('/:comm/edit', middle.isCommentOwner, function (req, res) {
  comment.findById(req.params.comm, function (err, comment) {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/edit', {
        comment: comment,
        camp_id: req.params.id
      });
    }
  });
});
router.put('/:comm', middle.isCommentOwner, function (req, res) {
  var updateData = req.body.update;
  comment.findByIdAndUpdate(req.params.comm, updateData, function (err, comment) {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "comment has been updated");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});
router["delete"]("/:comm", middle.isCommentOwner, function (req, res) {
  comment.findByIdAndRemove(req.params.comm, function (err) {
    req.flash("success", "comment has been deleted");
    res.redirect("/campgrounds/" + req.params.id);
  });
});
module.exports = router;