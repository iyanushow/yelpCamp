const mongoose = require('mongoose') 

// schema setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image:String,
    description: String,
    createdAt: {type: Date, default: Date.now},
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