const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title:{
        type: String,
    },
    summary: {
        type: String,
    },
    content: {
        type: String
    },
    cover: {
        type: String
    },
    author: {
        type:mongoose.Schema.Types.ObjectId, 
        ref: "User",
    },
}, 
{ timestamps: true }
);



module.exports = mongoose.model('Post', PostSchema)
