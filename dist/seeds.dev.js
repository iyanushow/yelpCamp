"use strict";

var mongoose = require('mongoose'),
    comment = require('./models/comment'),
    campground = require('./models/campground');

var data = [{
  name: 'Granite Hill',
  image: '/803226.png',
  description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus placeat cum, obcaecati illum cumque voluptas iusto dolorum! Sequi fugiat, praesentium placeat repellendus illum est ex id, minus corrupti, nisi minima?'
}, {
  name: 'Mountain Rest',
  image: '/45241.png',
  description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus placeat cum, obcaecati illum cumque voluptas iusto dolorum! Sequi fugiat, praesentium placeat repellendus illum est ex id, minus corrupti, nisi minima?'
}, {
  name: 'Salmon Creek',
  image: '/2398220.png',
  description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus placeat cum, obcaecati illum cumque voluptas iusto dolorum! Sequi fugiat, praesentium placeat repellendus illum est ex id, minus corrupti, nisi minima?'
}];

module.exports = function seedDB() {
  //  DELETE ALL CAMPGROUNDS
  campground.deleteMany({}, function (err) {// if(!err){
    //     // CREATE CAMPS
    //     data.forEach(seed => {
    //         campground.create(seed, (err, campground) => {
    //             if(!err){
    //                 console.log('campground added')
    //                 //CREATE A COMMENT
    //                 comment.create(
    //                     {
    //                         text:'boring! get me out', author: 'Maloy'
    //                     },
    //                     (err, comment) => {
    //                         if(!err){
    //                             campground.comments.push(comment);
    //                             campground.save();
    //                             console.log('added')
    //                         }else{
    //                             console.log(err)
    //                         }
    //                     }
    //                 );
    //             }
    //             else{
    //                 console.log(err)
    //             }
    //         });
    //     });
    // }else{
    //     console.log(err)
    // }
  });
};