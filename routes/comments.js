const express = require('express'),
router = express.Router({mergeParams: true }),
campground = require('../models/campground'),
comment = require('../models/comment'),
middle = require('../middleware');


// =========================
// COMMENTS ROUTES
// ============================


router.get('/new',middle.isLoggedIn, (req,res)=>{
    campground.findById(req.params.id, (err,camp) => {
        if(err){
            console.log(err)
        }
        else{
            res.render('comments/new', {camp:camp})
        }
    });
});

router.post('/',middle.isLoggedIn, (req,res)=>{
    campground.findById(req.params.id, (err,camp) => {
        if(err){
            console.log(err); 
        }else{
            comment.create(req.body.comment, (err, comment)=>{
                if(err){
                    console.log(err); 
                    
                }
                else{
                    //add user 
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save()
                    
                    camp.comments.push(comment);
                    camp.save();
                    req.flash("success", "comment added");
                    res.redirect(`/campgrounds/${camp._id}`)
                }
            });
        }
    });   
}); 

// EDIT UPDATE AND DESTROY ROUTES
router.get('/:comm/edit', middle.isCommentOwner, (req, res) => {
    comment.findById(req.params.comm, (err,comment) => {
        if(err){
            console.log(err)
        }
        else{
            res.render('comments/edit', {comment:comment, camp_id: req.params.id})
        }
    });
});


router.put('/:comm',middle.isCommentOwner, (req,res)=>{
    var updateData = req.body.update;
    comment.findByIdAndUpdate(req.params.comm,updateData, (err,comment) => {
        if(err){
            res.redirect("back") ;
        }else{
            req.flash("success", "comment has been updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });   
});

router.delete("/:comm",middle.isCommentOwner, (req,res)=>{
    comment.findByIdAndRemove(req.params.comm, (err)=>{
        req.flash("success", "comment has been deleted");
        res.redirect("/campgrounds/"+ req.params.id) 
    })
    
})



module.exports= router;