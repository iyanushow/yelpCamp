"use strict";

var passportLocalMongoose = require('passport-local-mongoose'),
    mongoose = require('mongoose'),
    userSchema = new mongoose.Schema({
  username: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);