const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const CommentSchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }
}, {timestamps: true})

module.exports = Comment = mongoose.model('Comment', CommentSchema);