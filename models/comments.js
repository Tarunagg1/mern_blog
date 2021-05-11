const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts',
        required:true
    },
    comment:{
        type:String,
        required:true,
        trim:true
    },
    userName:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})

const commentmodel = mongoose.model('comment',commentSchema);
module.exports = commentmodel;




