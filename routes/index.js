const express = require('express'),
middle = require('../middleware'),
User = require('../models/user'),
passport = require('passport'),
campground = require('../models/campground'),

router = express.Router();

// HOME ROUTE
router.get('/', (req,res) => {
    res.render('Home')
})


// =========================
// AUTH ROUTES  
// ============================
//REGISTER ROUTES
router.get('/register', (req,res)=>{
    res.render('register', {page: 'register'});
});
router.post('/register', (req,res)=>{
    
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.username,
        email: req.body.email
    });
    if (req.body.adminCode === 'secretcode123') {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, (err, user)=>{
        if (err) {
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate('local')(req,res, () =>{
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect('/campgrounds');
    
        });
        
        
    })
});



//LOGIN ROUTES
router.get('/login', (req,res)=>{
    res.render('login', {page: 'login'});
});
router.post('/login',passport.authenticate('local',{
    
    successRedirect:'/campgrounds',
    failureRedirect:'/register'

}), (req,res)=>{
   
});
router.get('/logout', (req,res)=>{
    req.logout();
    req.flash("success", "successfully logged out");
    res.redirect('/');

});


//user profiles
router.get('/users/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err || !user) {
            req.flash('error', "Something went wrong!")
            console.log(err)
            res.redirect('/')
        }
        campground.find().where('author.id').equals(user._id).exec((err, camps) => {
           if (err) {
                req.flash('error', "Something went wrong!")
                console.log(err)
                res.redirect('/')
            } 
            res.render('users/show', { user: user, campgrounds: camps })
            
        })
        
        
    });
});


module.exports = router;