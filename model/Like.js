const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }
}, {timestamps: true})

module.exports = Like = mongoose.model('Like', likeSchema)