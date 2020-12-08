const passportLocalMongoose = require('passport-local-mongoose'),
    mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    avi: String,
    firstName: String,
    LastName: String,
    email: String,
    isAdmin: {type: Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema)