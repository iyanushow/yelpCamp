const express = require('express'),
middle = require('../middleware'),
User = require('../models/user'),
passport = require('passport'),
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
    res.render('register');
});
router.post('/register', (req,res)=>{
    
    var newUser = new User({ username: req.body.username });
    if (req.body.adminCode === 'secretcode123') {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            req.flash("error", err.message);
            return res.redirect('/register')
        }else{
            passport.authenticate('local')(req,res, () =>{
                req.flash("success", "Welcome to YelpCamp " + user.username);
                res.redirect('/campgrounds');
     
            });
        }
        
    })
});



//LOGIN ROUTES
router.get('/login', (req,res)=>{
    res.render('login');
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





module.exports = router;