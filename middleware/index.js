const campground = require('../models/campground'),
    comment= require("../models/comment"); 

var middleObj = {
    isLoggedIn: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash("error", "Please Log in")
            res.redirect('/login')
        }
    },
    isOwner: function(req,res,next){
        if (req.isAuthenticated()){
            campground.findById(req.params.id, (err, campground)=>{
                if(err || !campground){
                    console.log(err);
                    req.flash("error", "Sorry, campground does not exist!");
                    res.redirect('/campgrounds')
                }
                else{ 
                    // does user own this camp
                    if (campground.author.id.equals(req.user._id) || req.user.isAdmin){
                        next()
                    }else{
                        req.flash("error", "Permission Denied: not your campground");
                        res.redirect("back")
                    }
                    
                    
                }
            })
        }else{
            req.flash("error", "Please log in");
            res.redirect("back");
        }
    },
    isCommentOwner: function(req,res,next){
        if (req.isAuthenticated()){
            comment.findById(req.params.comm, (err, comment)=>{
                if(err || comment){
                    console.log(err);
                    res.redirect("back")
                }
                else{ 
                    // does user own this camp
                    if (comment.author.id.equals(req.user._id) || req.user.isAdmin){
                        next()
                    }else{
                        req.flash("error", "Permission Denied: not your comment");
                        res.redirect("back")
                    }
                    
                    
                }
            })
        }else{
            req.flash("error", "Please log in");
            res.redirect("back");
        }
    },
    isAdmin: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.isAdmin) {
                next()
            } else {
                req.flash('error', 'This site is currently read only')
                res.redirect('back')
            }
        } else {
            req.flash("error", "Please log in");
            res.redirect("back");
        }
    }
}

module.exports = middleObj