var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    created: {type:Date, default:Date.now},
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        username:String
    },
    comments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
});

// create Blog model, refer to Blog collection in mongo DB
module.exports = mongoose.model("Blog", blogSchema);