const express = require('express'),
campground = require('../models/campground'),
middle = require('../middleware'),  
router = express.Router();

router.get('/', (req, res) => {
    campground.find({}, (err, camps) =>{ 
        if(err){console.log(`OOPS!!! ${err}`)}
        else{
            res.render('campgrounds/index', {campgrounds: camps, page: 'campgrounds'})  
        };
    });
    
});
router.post('/',middle.isLoggedIn, function(req, res){
    var campName = req.body.campName,
        campImage = req.body.imageUrl,
        campInfo = req.body.campInfo,
        campPrice = req.body.campPrice
        author = {
            id : req.user._id,
            username: req.user.username

        };
    
    var newCamp = {name: campName,price:campPrice, image: campImage, description:campInfo, author : author}
    campground.create(newCamp, (err, createdCamp) =>{
        if(err){console.log(`OOPS!!! ${err}`)}
        else{
            res.redirect('/campgrounds'); 
        }  
    });
    

});

router.get('/new',middle.isLoggedIn, (req, res) => {
    res.render('campgrounds/new.ejs')
    
});

router.get('/:id', (req,res)=>{
    campground.findById(req.params.id).populate('comments').exec((err, camp)=>{
        if(err || camp == undefined){
            console.log(err);
            req.flash('error', "Sorry, campground does not exist")
            return res.redirect('/campgrounds');
        }
        
        res.render('campgrounds/show', { camp: camp });
        
    });
    
    
});

router.get('/:id/edit',middle.isOwner, (req,res)=>{
    // is user logged in
    campground.findById(req.params.id, (err, campground)=>{
        if (err || campground === undefined) {
            console.log(err);
            req.flash('error', 'Sorry, campground does not exist!');
            return res.redirect('/campgrounds');

        }
        res.render('campgrounds/edit',{camp:campground});
    });   
})

router.put('/:id',middle.isOwner, (req,res)=>{
    var camp = req.body.camp;
    campground.findByIdAndUpdate(req.params.id,camp, (err, camp) =>{
        if(err){
            console.log(err);
            res.redirect('/campgrounds')
        }
        else{ 
            req.flash("success", "campground successfully updated")
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
    
})
router.delete('/:id',middle.isOwner, (req, res)=>{
    campground.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            console.log(err);
            res.redirect('/campgrounds')
        }
        else{ 
            res.redirect(`/campgrounds`);
        }
    })
})

module.exports= router;