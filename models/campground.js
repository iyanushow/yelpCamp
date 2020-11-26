const mongoose = require('mongoose') 

// schema setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image:String,
    description: String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"   
        }
    ],
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String

    }
})

module.exports = mongoose.model('campground', campgroundSchema);