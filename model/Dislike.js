const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dislikeSchema = new Schema({
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

module.exports = Dislike = mongoose.model('Dislike', dislikeSchema)